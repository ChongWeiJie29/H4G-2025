import React from "react";
import styled from "styled-components";
import WeeklyRequestsPage from "./WeeklyRequestsPage";
import InventorySummaryPage from "./InventorySummaryPage";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ComponentContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SummaryReports: React.FC = () => {
  return (
    <PageContainer>
      <ComponentContainer>
        <WeeklyRequestsPage />
      </ComponentContainer>
      <ComponentContainer>
        <InventorySummaryPage />
      </ComponentContainer>
    </PageContainer>
  );
};

export default SummaryReports;
