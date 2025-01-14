import React from "react";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const HeaderText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  color: black;
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

interface CartHeaderProps {
    itemCount: number;
    onClearCart: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({ itemCount,  onClearCart }) => {
    return (
        <Header>
            <HeaderText>Items in cart: {itemCount}</HeaderText>

            <ClearCartButton onClick={onClearCart}>Clear Cart</ClearCartButton>
        </Header>
    );
};

export default CartHeader;
