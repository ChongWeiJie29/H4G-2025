import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const TotalCostText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 10px;
`;

const ClearCartButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ff6666;
  }
`;

const ConfirmPurchaseButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

interface CartFooterProps {
  totalCost: number;
  onClearCart: () => void;
}

const CartFooter: React.FC<CartFooterProps> = ({ totalCost, onClearCart }) => {
  return (
    <FooterWrapper>
      <TotalCostText>Total cost: {totalCost.toFixed(2)} 💳</TotalCostText>
      <ButtonSection>
        <ClearCartButton onClick={onClearCart}>Clear Cart</ClearCartButton>
        <ConfirmPurchaseButton>Confirm Purchase</ConfirmPurchaseButton>
      </ButtonSection>
    </FooterWrapper>
  );
};

export default CartFooter;

