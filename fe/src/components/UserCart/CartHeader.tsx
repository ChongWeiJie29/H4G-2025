import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const BackToShop = styled.button`
  background: #fff;
  border: 2px solid #aaa;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  align-self: flex-start;

  &:hover {
    background-color: #ccc;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface CartHeaderProps {
    itemCount: number;
    onClearCart: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({ itemCount, onClearCart }) => {
    const navigate = useNavigate();
    return (
        <Header>
            <HeaderText>Items in cart: {itemCount}</HeaderText>
            <Buttons>
                <BackToShop onClick={() => navigate("/shop")}>
                    <img src="images/shopping-bag.png" alt="bag" width="35" />
                </BackToShop>
                <ClearCartButton onClick={onClearCart}>Clear Cart</ClearCartButton>
            </Buttons>
        </Header>
    );
};

export default CartHeader;
