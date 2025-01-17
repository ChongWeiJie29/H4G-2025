import React from "react";
import styled from "styled-components";

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 10px 20px;
`;

const StatNumber = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const StatLabel = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
`;

interface TotalStatsProps {
  totalProducts: number;
  totalTags: number;
  totalQuantity: number;
}

const TotalStats: React.FC<TotalStatsProps> = ({ totalProducts, totalTags, totalQuantity }) => {
  return (
    <StatsContainer>
      <StatCard>
        <StatNumber>{totalProducts}</StatNumber>
        <StatLabel>Total Products</StatLabel>
      </StatCard>
      <StatCard>
        <StatNumber>{totalTags}</StatNumber>
        <StatLabel>Total Tags</StatLabel>
      </StatCard>
      <StatCard>
        <StatNumber>{totalQuantity}</StatNumber>
        <StatLabel>Total Quantity</StatLabel>
      </StatCard>
    </StatsContainer>
  );
};

export default TotalStats;

