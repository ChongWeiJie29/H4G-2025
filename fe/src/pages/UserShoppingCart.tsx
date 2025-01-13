import React, { useState } from "react";
import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SideBarMenu from "../components/General/SideBarMenu";
import MockCart from "../mockDatabase/MockCart";
import CartItemsContainer from "../components/UserCart/CartItemsContainer";
import CartHeader from "../components/UserCart/CartHeader";
import CartFooter from "../components/UserCart/CartFooter";

const CartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;

  height: 100vh;
  position: relative;
`;

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState(MockCart);

  const calculateTotalCost = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.unitCost * item.quantity,
      0,
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <CartPageContainer>
      <UserPageHeader />
      <CartHeader itemCount={cartItems.length} />
      <CartItemsContainer cartItems={cartItems} />
      <CartFooter
        totalCost={calculateTotalCost()}
        onClearCart={handleClearCart}
      />
      <SideBarMenu />
    </CartPageContainer>
  );
};

export default CartPage;
