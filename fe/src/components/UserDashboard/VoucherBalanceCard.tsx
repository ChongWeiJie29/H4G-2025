import React from "react";
import styled from "styled-components";

// Define the type for props
interface VoucherBalanceCardProps {
  voucherAmount: number | null; // Accept null in case the balance is unavailable
}

// Styled Card Component
const Card = styled.div`
  flex: 0.75;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const VoucherBalanceCard: React.FC<VoucherBalanceCardProps> = ({
  voucherAmount,
}) => {
  return (
    <Card>
      <h2>Voucher Balance</h2>
      <strong>{voucherAmount !== null ? voucherAmount : "N/A"} credits</strong>
    </Card>
  );
};

export default VoucherBalanceCard;
