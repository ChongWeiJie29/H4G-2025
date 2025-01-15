import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Product } from "../../definitions/Product";
import ConfirmationModal from "../General/ConfirmationModal";
import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from "../../gql/ops";
import { useMutation } from "@apollo/client";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const ContainerWrapper = styled.div`
  position: relative;
`;

const CardContainer = styled.div<{ isOptionsVisible: boolean }>`
  position: relative;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition:
    box-shadow 0.3s ease,
    transform 0.2s ease,
    background-color 0.2s ease;

  ${({ isOptionsVisible }) =>
    isOptionsVisible &&
    css`
      background-color: #f5f5f5;
      animation: ${fadeIn} 0.3s ease forwards;
    `}

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const ProductDescription = styled.div`
  font-size: 14px;
  color: #555;
  flex: 1;
  margin: 8px 0;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #888;
`;

const QuantityLeft = styled.div`
  font-size: 12px;
  color: #888;
`;

const UnitCost = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const OptionsOverlay = styled.div<{ isExiting: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  animation: ${({ isExiting }) => (isExiting ? fadeOut : fadeIn)} 0.3s ease;
`;

const DeleteButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #eee;
  }
`;

const CancelButton = styled.button`
  background: #e00;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c00;
  }
`;

const CategoryTag = styled.div`
  background: #8ebdb6;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  margin: 8px 0;
  align-self: flex-start;
`;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleShowOptions = () => setOptionsVisible(true);

  const handleHideOptions = () => {
    setIsExiting(true);
    setTimeout(() => {
      setOptionsVisible(false);
      setIsExiting(false);
    }, 300);
  };

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteProduct({
        variables: {
          name: product.name,
        },
        update: (cache) => {
          const existingProducts: any = cache.readQuery({ query: GET_ALL_PRODUCTS });
          if (existingProducts) {
            cache.writeQuery({
              query: GET_ALL_PRODUCTS,
              data: {
                getAllAvailableProducts: {
                  products: existingProducts.getAllAvailableProducts.products.filter(
                    (p: Product) => p.name !== product.name
                  ),
                },
              },
            });
          }
        },
      });
      setModalVisible(false);
      setOptionsVisible(false);
    } catch (err) {
      console.error("Failed to delete the product:", err);
    }
  };
  

  const handleCancelDelete = () => {
    setModalVisible(false);
  };

  return (
    <ContainerWrapper>
      <CardContainer
        onClick={isOptionsVisible ? undefined : handleShowOptions}
        isOptionsVisible={isOptionsVisible}
      >
        <ProductImage src={product.link} alt={product.name} />
        {!isOptionsVisible && (
          <ProductDetails>
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
            <CategoryTag>{product.tag}</CategoryTag>
            <ProductFooter>
              <QuantityLeft>Qty: {product.quantity}</QuantityLeft>
              <UnitCost>{product.price} 💳</UnitCost>
            </ProductFooter>
          </ProductDetails>
        )}
      </CardContainer>

      {isOptionsVisible && (
        <OptionsOverlay isExiting={isExiting}>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          <CancelButton onClick={handleHideOptions}>Cancel</CancelButton>
        </OptionsOverlay>
      )}
      {isModalVisible && (
        <ConfirmationModal
          modalContent={`Are you sure you want to delete "${product.name}"?`}
          onClickYes={handleConfirmDelete}
          onClickNo={handleCancelDelete}
        />
      )}
    </ContainerWrapper>
  );
};

export default ProductCard;
