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
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 2fr;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 0;
`;

const ItemLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const ItemValue = styled.div`
  font-size: 14px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const QuantityButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 4px;
  background-color: #ddd;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #eee;
  }
`;

const QuantityValue = styled.span`
  font-size: 16px;
  font-weight: bold;
  padding: 0 5px;
`;

interface CartItemsContainerProps {
  cartItems: CartItem[];
  updateCartItemQuantity: (index: number, newQuantity: number) => void;
}

const CartItemsContainer: React.FC<CartItemsContainerProps> = ({
  cartItems,
  updateCartItemQuantity,
}) => {
  const handleDecrement = (index: number, currentQuantity: number) => {
    if (currentQuantity > 0) {
      updateCartItemQuantity(index, currentQuantity - 1);
    }
  };

  const handleIncrement = (index: number, currentQuantity: number) => {
    updateCartItemQuantity(index, currentQuantity + 1);
  };

  return (
    <CartItemsWrapper>
      {cartItems.map((item, index) => (
        <CartItemCard key={index}>
          <ProductImage src={item.product.image} alt={item.product.name} />
          <ProductDetails>
            <ItemLabel>Item Name:</ItemLabel>
            <ItemValue>{item.product.name}</ItemValue>
          </ProductDetails>
          <ProductDetails>
            <ItemLabel>Unit Cost:</ItemLabel>
            <ItemValue>{item.product.unitCost} 💳</ItemValue>
          </ProductDetails>
          <QuantityContainer>
            <QuantityButton
              onClick={() => handleDecrement(index, item.quantity)}
              disabled={item.quantity <= 0}
            >
              -
            </QuantityButton>
            <QuantityValue>{item.quantity}</QuantityValue>
            <QuantityButton
              onClick={() => handleIncrement(index, item.quantity)}
            >
              +
            </QuantityButton>
          </QuantityContainer>
        </CartItemCard>
      ))}
    </CartItemsWrapper>
  );
};

export default CartItemsContainer;
