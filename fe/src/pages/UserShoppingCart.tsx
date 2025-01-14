import React, { useState } from "react";
import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SideBarMenu from "../components/General/SideBarMenu";
import MockCart from "../mockDatabase/MockCart";
import CartItemsContainer from "../components/UserCart/CartItemsContainer";
import CartHeader from "../components/UserCart/CartHeader";
import CartFooter from "../components/UserCart/CartFooter";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../gql/ops";

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
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const { loading, error, data } = useQuery(GET_USER, {});

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const user = data.getUser;

  return (
    <CartPageContainer>
      <UserPageHeader user={user} />
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
