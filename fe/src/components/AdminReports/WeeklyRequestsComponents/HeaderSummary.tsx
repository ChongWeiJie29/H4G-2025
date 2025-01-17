import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
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

interface HeaderSummaryProps {
  totalPurchaseRequests: number;
  totalVoucherRequests: number;
}

const HeaderSummary: React.FC<HeaderSummaryProps> = ({
  totalPurchaseRequests,
  totalVoucherRequests,
}) => {
  return (
    <HeaderContainer>
      <StatCard>
        <StatNumber>{totalPurchaseRequests}</StatNumber>
        <StatLabel>Total Purchase Requests</StatLabel>
      </StatCard>
      <StatCard>
        <StatNumber>{totalVoucherRequests}</StatNumber>
        <StatLabel>Total Voucher Requests</StatLabel>
      </StatCard>
    </HeaderContainer>
  );
};

export default HeaderSummary;

