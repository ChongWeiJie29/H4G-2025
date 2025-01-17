import React from "react";
import styled from "styled-components";
import WeeklyRequests from "./WeeklyRequests";
import InventorySummaryPage from "./InventorySummaryPage";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const InventorySummaryContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SummaryReports: React.FC = () => {
  return (
    <PageContainer>
      <WeeklyRequests />
      <InventorySummaryContainer>
        <InventorySummaryPage />
      </InventorySummaryContainer>
    </PageContainer>
  );
};

export default SummaryReports;

