import React, { useState } from "react";
import styled from "styled-components";
import { CONFIRM_SHOPPING_CART } from "../../gql/ops";
import { useMutation } from "@apollo/client";
import { CartItem } from "../../definitions/CartItem";
import ErrorModal from "../General/ErrorModal";

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
  const [showError, setShowError] = useState(true);

  /** yo */
  const [confirmShoppingCart, { data, loading, error }] = useMutation(CONFIRM_SHOPPING_CART);

  if (loading) return <p>Loading...</p>

  // let products: CartItem[]  = [];

  const handleOnClick = () => {
    // confirmShoppingCart({ variables: { shoppingCart: products } });
  };

  const handleCloseError = () => setShowError(false);

  return (
    <FooterWrapper>
      {error && showError && (
        <ErrorModal error={error} close={handleCloseError} />
      )}
      <TotalCostText>Total cost: {totalCost} 💳</TotalCostText>
      <ButtonSection>
        <ClearCartButton onClick={onClearCart}>Clear Cart</ClearCartButton>
        <ConfirmPurchaseButton onClick={handleOnClick}>Confirm Purchase</ConfirmPurchaseButton>
      </ButtonSection>
    </FooterWrapper>
  );
};

export default CartFooter;

