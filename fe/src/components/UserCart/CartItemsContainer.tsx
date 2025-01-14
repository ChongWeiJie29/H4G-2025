import React, { useState }from "react";
import styled from "styled-components";
import { CartItem } from "../../definitions/CartItem";
import { useCart } from "../General/CartContext";

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

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:first-child {
    background-color: #f44336;
    color: white;
  }

  &:last-child {
    background-color: #ddd;
    color: black;
  }
`;

const CartItemsContainer: React.FC = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);

  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 1) {
      addToCart(item.product, -1); // Decrease quantity by 1
    } else {
      setItemToRemove(item); // Show confirmation modal if quantity would become 0
    }
  };

  const handleIncrement = (item: CartItem) => {
    addToCart(item.product, 1); // Increase quantity by 1
  };

  const confirmRemoveItem = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.product.name);
      setItemToRemove(null); // Close the modal
    }
  };

  const cancelRemoveItem = () => {
    setItemToRemove(null); // Close the modal without removing
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
        <ConfirmationModal>
          <ModalContent>
            <p>Are you sure you want to remove "{itemToRemove.product.name}"?</p>
            <ModalActions>
              <ModalButton onClick={confirmRemoveItem}>Yes</ModalButton>
              <ModalButton onClick={cancelRemoveItem}>No</ModalButton>
            </ModalActions>
          </ModalContent>
        </ConfirmationModal>
      )}
    </>
  );
};

export default CartItemsContainer;
