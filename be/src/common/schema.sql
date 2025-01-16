BEGIN;

-- DROP TYPE IF EXISTS user_type;
-- DROP TYPE IF EXISTS voucher_type;
-- DROP TYPE IF EXISTS request_type;
-- DROP TYPE IF EXISTS product_tag;
-- CREATE TYPE user_type AS ENUM ('resident', 'admin');
-- CREATE TYPE voucher_type AS ENUM ('pending', 'accepted', 'rejected');
-- CREATE TYPE request_type AS ENUM ('pending', 'accepted', 'rejected');
-- CREATE TYPE product_tag AS ENUM (
--     'Health & Wellness',
--     'Education & Learning',
--     'Sports & Recreation',
--     'Clothing & Apparel',
--     'Personal Care',
--     'Food & Beverages',
--     'Furniture & Bedding',
--     'Toys & Games',
--     'Art & Craft Supplies',
--     'Safety & Security',
--     'Hygiene & Sanitation',
--     'Furniture & Storage',
--     'Events & Celebrations',
--     'Volunteer & Donation',
--     'Technology & Learning Tools'
-- );


CREATE TABLE IF NOT EXISTS users (
  status user_type DEFAULT 'resident' NOT NULL,
  isActive BOOLEAN DEFAULT true NOT NULL,
  name TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  voucher INTEGER DEFAULT 0 NOT NULL CHECK (voucher >= 0)
);

CREATE TABLE IF NOT EXISTS vouchers (
  voucher_id SERIAL PRIMARY KEY,
  status voucher_type DEFAULT 'pending' NOT NULL,
  name TEXT NOT NULL REFERENCES users (name) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  amount INTEGER NOT NULL CHECK (amount >= 0),
  task TEXT NOT NULL,
  request_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  response_time TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS products (
  name TEXT PRIMARY KEY,
  price INTEGER NOT NULL CHECK (price >= 0),
  quantity INTEGER NOT NULL,
  description TEXT NOT NULL,
  tag product_tag NOT NULL,
  link TEXT NOT NULL DEFAULT 'https://www.pngitem.com/pimgs/m/568-5680053_prod-placeholder-vector-product-icon-png-transparent-png.png'
);

CREATE TABLE IF NOT EXISTS requests (
  request_id SERIAL PRIMARY KEY,
  status request_type NOT NULL DEFAULT 'pending',
  name TEXT NOT NULL REFERENCES users (name) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  product TEXT NOT NULL REFERENCES products (name) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price INTEGER NOT NULL CHECK (price >= 0),
  request_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  response_time TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS productlogs (
  log_id SERIAL PRIMARY KEY,
  action_type TEXT NOT NULL,
  product_name TEXT NOT NULL,
  old_quantity INTEGER,
  new_quantity INTEGER,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);


CREATE OR REPLACE FUNCTION update_user_voucher_after_voucher_acceptance_func()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'accepted' AND OLD.status <> 'accepted' THEN
    UPDATE users
    SET voucher = voucher + NEW.amount
    WHERE name = NEW.name;
  ELSIF NEW.status = 'rejected' AND OLD.status = 'accepted' THEN
    UPDATE users
    SET voucher = voucher - NEW.amount
    WHERE name = NEW.name;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_user_voucher_after_voucher_acceptance_trigger
AFTER UPDATE OF status ON vouchers
FOR EACH ROW
EXECUTE FUNCTION update_user_voucher_after_voucher_acceptance_func();

CREATE OR REPLACE FUNCTION refund_user_after_request_rejection_func()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'rejected' AND OLD.status <> 'rejected' THEN
    UPDATE users
    SET voucher = voucher + (NEW.quantity * NEW.price)
    WHERE name = NEW.name;
  END IF;
  IF NEW.status = 'accepted' AND OLD.status <> 'accepted' THEN
    UPDATE products
    SET quantity = quantity - NEW.quantity
    WHERE name = NEW.product;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER refund_user_after_request_rejection_trigger
AFTER UPDATE OF status ON requests
FOR EACH ROW
EXECUTE FUNCTION refund_user_after_request_rejection_func();

CREATE OR REPLACE FUNCTION log_product_changes_func()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO productlogs (action_type, product_name, old_quantity, new_quantity)
        VALUES ('INSERT', NEW.name, NULL, NEW.quantity);
    ELSIF TG_OP = 'UPDATE' THEN
        IF NEW.quantity <> OLD.quantity THEN
            INSERT INTO productlogs (action_type, product_name, old_quantity, new_quantity)
            VALUES ('UPDATE', NEW.name, OLD.quantity, NEW.quantity);
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO productlogs (action_type, product_name, old_quantity, new_quantity)
        VALUES ('DELETE', OLD.name, OLD.quantity, null);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER log_product_changes_trigger
AFTER INSERT OR UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION log_product_changes_func();

COMMIT;
