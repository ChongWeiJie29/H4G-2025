import React from "react";
import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SideBarMenu from "../components/General/SideBarMenu";
import MockCart from "../mockDatabase/MockCart";

const CartPageContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  position: relative;
`;

const CartHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  color: black;
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
  margin: 20px 0;
`;

const TotalCostSection = styled.div`
  width: 80%;
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

const CartItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuantityInfo = styled.div`
  font-size: 14px;
  color: gray;
`;

const CartPage: React.FC = () => {
  const calculateTotalCost = () => {
    return MockCart.reduce(
      (total, item) => total + item.product.unitCost * item.quantity,
      0
    );
  };

  return (
    <CartPageContainer>
      <UserPageHeader />
      <CartHeader>Items in cart: {MockCart.length}</CartHeader>
      <CartItemsContainer>
        {MockCart.map((item, index) => (
          <CartItemCard key={index}>
            <ProductDetails>
              <ProductImage src={item.product.image} alt={item.product.name} />
              <ProductInfo>
                <span>{item.product.name}</span>
                <QuantityInfo>Quantity: {item.quantity}</QuantityInfo>
                <span>${item.product.unitCost.toFixed(2)} each</span>
              </ProductInfo>
            </ProductDetails>
            <span>Total: ${(item.product.unitCost * item.quantity).toFixed(2)}</span>
          </CartItemCard>
        ))}
      </CartItemsContainer>
      <TotalCostSection>
        <TotalCostText>Total cost: ${calculateTotalCost().toFixed(2)}</TotalCostText>
        <ButtonSection>
          <ClearCartButton>Clear Cart</ClearCartButton>
          <ConfirmPurchaseButton>Confirm Purchase</ConfirmPurchaseButton>
        </ButtonSection>
      </TotalCostSection>
      <SideBarMenu />
    </CartPageContainer>
  );
};

export default CartPage;

