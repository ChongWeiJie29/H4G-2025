import React from "react";
import styled from "styled-components";
import HeaderSummary from "./WeeklyRequestsComponents/HeaderSummary";
import PurchaseRequestsLogs from "./WeeklyRequestsComponents/PurchaseRequestsLogs";
import VoucherRequestsLogs from "./WeeklyRequestsComponents/VoucherRequestsLogs";

const PageContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
`;

const WeeklyRequestsPage: React.FC = () => {
  const totalPurchaseRequests = 120;
  const totalVoucherRequests = 50;
  const totalUsersInvolved = 35;

  const purchaseRequests = [
    {
      requestId: "101",
      userName: "Alice",
      productName: "Laptop",
      quantity: 2,
      totalPrice: 2000,
      requestDate: "2025-01-15",
      status: "Approved",
    },
    {
      requestId: "102",
      userName: "Bob",
      productName: "Office Chair",
      quantity: 1,
      totalPrice: 150,
      requestDate: "2025-01-16",
      status: "Pending",
    },
    // Add more mock data as needed...
  ];

  const voucherRequests = [
    {
      requestId: "201",
      userName: "Alice",
      taskDescription: "Write blog posts",
      voucherAmount: 10,
      requestDate: "2025-01-15",
      responseDate: "2025-01-16",
      status: "Approved",
    },
    {
      requestId: "202",
      userName: "Charlie",
      taskDescription: "Organize a workshop",
      voucherAmount: 5,
      requestDate: "2025-01-16",
      status: "Pending",
    },
    // Add more mock data as needed...
  ];

  return (
    <PageContainer>
      <h2>Requests Insights</h2>
      <HeaderSummary
        totalPurchaseRequests={totalPurchaseRequests}
        totalVoucherRequests={totalVoucherRequests}
        totalUsersInvolved={totalUsersInvolved}
      />
      <PurchaseRequestsLogs requests={purchaseRequests} />
      <VoucherRequestsLogs requests={voucherRequests} />
    </PageContainer>
  );
};

export default WeeklyRequestsPage;
