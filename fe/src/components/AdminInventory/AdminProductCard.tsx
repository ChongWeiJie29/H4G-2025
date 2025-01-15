import React, { useState } from "react";
import styled from "styled-components";
import { Product } from "../../definitions/Product";
import ConfirmationModal from "../General/ConfirmationModal";

const ContainerWrapper = styled.div<{ isModalVisible: boolean }>`
  position: relative;

  // Disable pointer events on background when modal is open
  ${({ isModalVisible }) =>
    isModalVisible &&
    `
    pointer-events: none;
    opacity: 0.8;
  `}
`;

const CardContainer = styled.div`
  position: relative;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: box-shadow 0.3s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
    cursor: pointer;
  }

  &:active {
    border-color: #f00;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: scale(0.98);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProductName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const ProductDetails = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex: 1;
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

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRemoveProduct = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Product "${product.name}" deleted.`);
    setIsModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <ContainerWrapper isModalVisible={isModalVisible}>
        <CardContainer onClick={handleRemoveProduct}>
          <ProductImage src={product.link} alt={product.name} />
          <ProductDetails>
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
            <CategoryTag>{product.tag}</CategoryTag>
            <ProductFooter>
              <QuantityLeft>Qty: {product.quantity}</QuantityLeft>
              <UnitCost>{product.price} 💳</UnitCost>
            </ProductFooter>
          </ProductDetails>
        </CardContainer>
      </ContainerWrapper>

      {isModalVisible && (
        <ConfirmationModal
          modalContent={`Delete ${product.name}?`}
          onClickYes={handleConfirmDelete}
          onClickNo={handleCancelDelete}
        />
      )}
    </>
  );
};

export default ProductCard;
