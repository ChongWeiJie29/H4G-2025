import React from "react";
import styled from "styled-components";
import { CartItem } from "../../definitions/CartItem";

const CartItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 98%;
  margin: 20px 0;
`;

const CartItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuantityInfo = styled.div`
  font-size: 14px;
  color: gray;
`;

interface CartItemsContainerProps {
  cartItems: CartItem[];
}

const CartItemsContainer: React.FC<CartItemsContainerProps> = ({ cartItems }) => {
  return (
    <CartItemsWrapper>
      {cartItems.map((item, index) => (
        <CartItemCard key={index}>
          <ProductDetails>
            <ProductImage src={item.product.image} alt={item.product.name} />
            <ProductInfo>
              <span>{item.product.name}</span>
              <QuantityInfo>Quantity: {item.quantity}</QuantityInfo>
              <span>${item.product.unitCost.toFixed(2)} each</span>
            </ProductInfo>
          </ProductDetails>
          <span>Total: ${(item.product.unitCost * item.quantity).toFixed(2)} 💳</span>
        </CartItemCard>
      ))}
    </CartItemsWrapper>
  );
};

export default CartItemsContainer;

