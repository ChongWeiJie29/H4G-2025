import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SideBarMenu from "../components/General/SideBarMenu";
import CartItemsContainer from "../components/UserCart/CartItemsContainer";
import CartHeader from "../components/UserCart/CartHeader";
import CartFooter from "../components/UserCart/CartFooter";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../gql/ops";
import { CartItem } from "../definitions/CartItem";
import { useNavigate } from "react-router-dom";

const CartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;

  height: 100vh;
  position: relative;
`;

const BackToShop = styled.button`
  background-color: #ddd;
  border: black 1px solid;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  width: 150px;

  &:hover {
    background-color: #ccc;
  }
`;

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("shoppingCart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
    }, [cartItems]);

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
            <BackToShop onClick={() => navigate("/shop")}>Back to Shop</BackToShop>
            <CartHeader itemCount={cartItems.length} onClearCart={handleClearCart} />
            <CartItemsContainer cartItems={cartItems} />
            <CartFooter totalCost={calculateTotalCost()} />
            <SideBarMenu />
        </CartPageContainer>
    );
};

export default CartPage;
