import React, { useState } from "react";
import styled from "styled-components";
import { Product } from "../../definitions/Product";
import { CartItem } from "../../definitions/CartItem";

const CardContainer = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProductName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const ProductDetails = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CategoryTag = styled.div`
  background: #8ebdb6;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  margin: 8px 0;
  align-self: flex-start;
`;

const ProductDescription = styled.div`
  font-size: 14px;
  color: #555;
  flex: 1;
  margin: 8px 0;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #888;
`;

const QuantityLeft = styled.div`
  font-size: 12px;
  color: #888;
`;

const UnitCost = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const Notification = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #4caf50;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  animation: fade-in-out 2s ease-out;

  @keyframes fade-in-out {
    0% { opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [notification, setNotification] = useState(false);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("shoppingCart") || "[]") as CartItem[];
    const existingItem = existingCart.find((item) => item.product.name === product.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ product, quantity: 1 });
    }
    localStorage.setItem("shoppingCart", JSON.stringify(existingCart));

    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
  };

  return (
    <CardContainer onClick={handleAddToCart}>
      <ProductImage src={product.link} alt={product.name} />
      <ProductDetails>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <CategoryTag>{product.tag}</CategoryTag>
        <ProductFooter>
          <QuantityLeft>Qty: {product.quantity}</QuantityLeft>
          <UnitCost>{product.price} 💳</UnitCost>
        </ProductFooter>
      </ProductDetails>
      {notification && <Notification>Item added to cart!</Notification>}
    </CardContainer>
  );
};

export default ProductCard;

