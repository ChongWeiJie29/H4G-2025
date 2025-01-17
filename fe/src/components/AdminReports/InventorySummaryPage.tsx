import React from "react";
import styled from "styled-components";
import TotalStats from "./InventoryComponents/TotalStats";
import TagPieChart from "./InventoryComponents/TagPieChart";
import TopProducts from "./InventoryComponents/TopProducts";
import InventoryLogs from "./InventoryComponents/InventoryLogs";

const PageContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
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

  return (
    <PageContainer>
      <h2>Inventory Insights</h2>
      {/* Total Stats Section */}
      <TotalStats
        totalProducts={totalProducts}
        totalTags={totalTags}
        totalQuantity={totalQuantity}
      />

      {/* Tag Pie Chart Section */}
      <TagPieChart tagData={tagData} />

      {/* Top Products Section */}
      <TopProducts products={topProducts} />

      {/* Inventory Logs Section */}
      <InventoryLogs />
    </PageContainer>
  );
};

export default InventorySummaryPage;
