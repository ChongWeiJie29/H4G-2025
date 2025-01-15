import React, { useState } from "react";
import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SideBarMenu from "../components/General/SideBarMenu";
import CartItemsContainer from "../components/UserCart/CartItemsContainer";
import CartHeader from "../components/UserCart/CartHeader";
import CartFooter from "../components/UserCart/CartFooter";
import { ApolloConsumer, useQuery } from "@apollo/client";
import { GET_USER } from "../gql/ops";
import { useCart } from "../components/General/CartContext";
import ConfirmationModal from "../components/General/ConfirmationModal";

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
  const { cartItems, clearCart, totalCost } = useCart();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { loading, error, data } = useQuery(GET_USER, {});

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const user = data.getUser;

  const handleClearCart = () => {
    setIsModalVisible(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setIsModalVisible(false);
  };

  const cancelClearCart = () => {
    setIsModalVisible(false);
  };

  return (
    <ApolloConsumer>
      {(client) => (
        <CartPageContainer>
        <UserPageHeader user={user} />
        <CartHeader itemCount={cartItems.length} onClearCart={handleClearCart} />
        <CartItemsContainer cartItems={cartItems} />
        <CartFooter  client={client} totalCost={totalCost} userVoucherAmount={user.voucher}/>
        <SideBarMenu />
        {isModalVisible && (
          <ConfirmationModal
            modalContent="Are you sure you want to clear the cart?"
            onClickYes={confirmClearCart}
            onClickNo={cancelClearCart}
          />
        )}
      </CartPageContainer>
      )}
    </ApolloConsumer>
  );
};

export default CartPage;

