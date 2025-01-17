import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductName = styled.span`
  font-weight: bold;
`;

const ProductCount = styled.span`
  color: #007bff;
`;

interface TopProduct {
  name: string;
  count: number;
}

interface TopProductsProps {
  products: TopProduct[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  return (
    <Container>
      <h3>Top 3 Trending Products</h3>
      <ProductList>
        {products.map((product, index) => (
          <ProductItem key={index}>
            <ProductName>{index + 1}. {product.name}</ProductName>
            <ProductCount>{product.count} sold</ProductCount>
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  );
};

export default TopProducts;

