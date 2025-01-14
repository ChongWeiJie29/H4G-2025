import React, { useState } from "react";
import styled from "styled-components";
import { Product } from "../../definitions/Product";
import { useCart } from "../General/CartContext";

const CardContainer = styled.div<{ isClicked: boolean }>`
  position: relative;
  background: white;
  border: 1px solid ${({ isClicked }) => (isClicked ? "#4caf50" : "#ccc")};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: box-shadow 0.3s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
    cursor: pointer;
  }

  &:active {
    border-color: #4caf50;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: scale(0.98);
  }
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
  width: 70%;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
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
  const [isClicked, setIsClicked] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);

    setNotification(true);
    setTimeout(() => setNotification(false), 2000);

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <CardContainer isClicked={isClicked} onClick={handleAddToCart}>
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

