import React from "react";
import styled from "styled-components";

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  color: black;
`;

interface CartHeaderProps {
  itemCount: number;
}

const CartHeader: React.FC<CartHeaderProps> = ({ itemCount }) => {
  return <Header>Items in cart: {itemCount}</Header>;
};

export default CartHeader;

