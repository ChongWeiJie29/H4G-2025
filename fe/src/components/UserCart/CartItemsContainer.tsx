import React, { useState }from "react";
import styled from "styled-components";
import { CartItem } from "../../definitions/CartItem";
import { useCart } from "../General/CartContext";
import ConfirmationModal from "../General/ConfirmationModal";

const CartItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 98%;
  margin: 20px 0;
`;

const CartItemCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 0;
`;

const ItemLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const ItemValue = styled.div`
  font-size: 14px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const QuantityButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 4px;
  background-color: #ddd;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #eee;
  }
`;

const QuantityValue = styled.span`
  font-size: 16px;
  font-weight: bold;
  padding: 0 5px;
`;

const CartItemsContainer: React.FC = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);

  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 1) {
      addToCart(item.product, -1);
    } else {
      setItemToRemove(item);
    }
  };

  const handleIncrement = (item: CartItem) => {
    addToCart(item.product, 1);
  };

  const confirmRemoveItem = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.product.name);
      setItemToRemove(null);
    }
  };

  const cancelRemoveItem = () => {
    setItemToRemove(null);
  };

  return (
    <>
      <CartItemsWrapper>
        {cartItems.map((item, index) => (
          <CartItemCard key={index}>
            <ProductImage src={item.product.link} alt={item.product.name} />
            <ProductDetails>
              <ItemLabel>Item Name:</ItemLabel>
              <ItemValue>{item.product.name}</ItemValue>
            </ProductDetails>
            <ProductDetails>
              <ItemLabel>Unit Cost:</ItemLabel>
              <ItemValue>{item.product.price} 💳</ItemValue>
            </ProductDetails>
            <QuantityContainer>
              <QuantityButton onClick={() => handleDecrement(item)}>-</QuantityButton>
              <QuantityValue>{item.quantity}</QuantityValue>
              <QuantityButton onClick={() => handleIncrement(item)}>+</QuantityButton>
            </QuantityContainer>
          </CartItemCard>
        ))}
      </CartItemsWrapper>

      {/* Confirmation Modal */}
      {itemToRemove && (
        <ConfirmationModal
          modalContent={`Are you sure you want to remove "${itemToRemove.product.name}"?`}
          onClickYes={confirmRemoveItem}
          onClickNo={cancelRemoveItem}
        />
      )}
    </>
  );
};

export default CartItemsContainer;
