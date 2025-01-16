import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Product } from "../../definitions/Product";

// Styled components
const WideCard = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: hidden;
  position: relative;

  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  justify-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
`;

const Carousel = styled.div<{ translatex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => `translateX(-${props.translatex}%)`};
`;

const CarouselCard = styled.div`
  flex: 0 0 33%; /* Adjust this percentage to show multiple cards at once */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-right: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 2px solid #e0e0e0;
`;

const Description = styled.div`
  margin-top: 10px;
  text-align: left;
  font-size: 14px;
  color: #666;
  width: 100%;
  max-width: 400px;
`;

const PriceTag = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #4caf50;
  margin: 10px 0;
`;

const QuantityTag = styled.p`
  font-size: 14px;
  color: #888;
`;

const Arrows = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Arrow = styled.button`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  z-index: 10;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const ArrowLeft = styled(Arrow)`
  position: absolute;
  left: 10px;
`;

const ArrowRight = styled(Arrow)`
  position: absolute;
  right: 10px;
`;

// Component
interface Props {
  products: Product[];
  productsCount: number;
}

const AvailableProductsCard: React.FC<Props> = ({ products, productsCount }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Auto-rotate logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 3 : prevIndex - 3 // Show 3 items at a time
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 3 ? 0 : prevIndex + 3 // Show 3 items at a time
    );
  };

  return (
    <WideCard>
      <Title>{productsCount} Available Products</Title>
      <CarouselWrapper>
        <Carousel translatex={currentIndex * 66.67}>
          {products.map((product, index) => (
            <CarouselCard key={index}>
              <Item>
                <ProductImage src={product.link} alt={product.name} />
                <h3>{product.name}</h3>
              </Item>
              <Description>
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
                <p>
                  <strong>Tag:</strong> {product.tag}
                </p>
                <PriceTag>Price: ${product.price.toFixed(2)}</PriceTag>
                <QuantityTag>Quantity: {product.quantity}</QuantityTag>
              </Description>
            </CarouselCard>
          ))}
        </Carousel>
        <Arrows>
          <ArrowLeft onClick={handlePrev}>&lt;</ArrowLeft>
          <ArrowRight onClick={handleNext}>&gt;</ArrowRight>
        </Arrows>
      </CarouselWrapper>
    </WideCard>
  );
};

export default AvailableProductsCard;
