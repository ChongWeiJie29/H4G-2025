import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 150px; /* Adjust height as necessary */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductCard: React.FC = () => {
  return <CardContainer />;
};

export default ProductCard;

