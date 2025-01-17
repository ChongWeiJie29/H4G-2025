import React from "react";
import styled from "styled-components";
import TotalStats from "./InventoryComponents/TotalStats";
import TagPieChart from "./InventoryComponents/TagPieChart";
import TopProducts from "./InventoryComponents/TopProducts";
import InventoryLogs from "./InventoryComponents/InventoryLogs";
import PriceHistogram from "./InventoryComponents/PriceHistogram";

const PageContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
`;

const Charts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const ChartContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const InventorySummaryPage: React.FC = () => {
  // Mock data for TotalStats
  const totalProducts = 120;
  const totalTags = 5;
  const totalQuantity = 350;

  // Mock data for TagPieChart
  const tagData = [
    { tag: "Electronics", count: 50 },
    { tag: "Furniture", count: 30 },
    { tag: "Stationery", count: 40 },
    { tag: "Apparel", count: 20 },
    { tag: "Others", count: 10 },
  ];

  // Mock data for TopProducts
  const topProducts = [
    { name: "Laptop", count: 150 },
    { name: "Office Chair", count: 120 },
    { name: "Notebook", count: 100 },
    { name: "Smartphone", count: 80 },
    { name: "Desk Lamp", count: 75 },
  ];

  // Mock data for PriceHistogram
  const priceData = [49, 99, 149, 199, 249, 99, 349, 50, 150, 200];

  return (
    <PageContainer>
      <h2>Inventory Insights</h2>
      <TotalStats
        totalProducts={totalProducts}
        totalTags={totalTags}
        totalQuantity={totalQuantity}
      />
      <ChartContainer>
        <h3>Inventory Distribution</h3>
        <Charts>
          <TagPieChart tagData={tagData} />
          <PriceHistogram priceData={priceData} />
        </Charts>
      </ChartContainer>
      <TopProducts products={topProducts} />
      <InventoryLogs />
    </PageContainer>
  );
};

export default InventorySummaryPage;
