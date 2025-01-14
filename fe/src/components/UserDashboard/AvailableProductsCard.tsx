import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../../gql/ops";
import { Product } from "../../definitions/Product";

// Styled components
const WideCard = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: hidden;
  position: relative;

  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  justify-items: center;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const Carousel = styled.div<{ translateX: number }>`
  display: flex;
  transition: transform 0.5s ease;
  transform: ${(props: { translateX: number }) =>
    `translateX(-${props.translateX}%)`};
`;

const CarouselCard = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: space-around;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0 0.5rem 0;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Arrows = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-50%);
  pointer-events: none; /* Prevents interference with other elements */
`;

const Arrow = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto; /* Reactivates button clicks */
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const AvailableProductsCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  let products: Product[] = [];

  // Auto-rotate logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length]);

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS, {});
  if (loading) return <p>Loading...</p>;
  products = !error ? data.getAllAvailableProducts.products: [];
  const productsCount = !error ? data.getAllAvailableProducts.productsCount : 0;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <WideCard>
      <h2>{productsCount} Available Products</h2>
      <CarouselWrapper>
        <Carousel translateX={currentIndex * 100}>
          {products.map((product, index) => (
            <CarouselCard key={index}>
              <Item>
                <ProductImage src={product.link} alt={product.name} />
                <h3>{product.name}</h3>
              </Item>
              <div>
                <strong>Description:</strong>
                <p>{product.description}</p>
              </div>
              <p>Tag: {product.tag}</p>
              <p>Price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </CarouselCard>
          ))}
        </Carousel>
        <Arrows>
          <Arrow onClick={handlePrev}>&lt;</Arrow>
          <Arrow onClick={handleNext}>&gt;</Arrow>
        </Arrows>
      </CarouselWrapper>
    </WideCard>
  );
};

export default AvailableProductsCard;
