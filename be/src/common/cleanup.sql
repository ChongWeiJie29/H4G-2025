BEGIN;

DELETE FROM users;
DELETE FROM products;
DELETE FROM requests;
DELETE FROM vouchers;

ALTER SEQUENCE requests_request_id_seq RESTART WITH 1;
ALTER SEQUENCE vouchers_voucher_id_seq RESTART WITH 1;

COMMIT;