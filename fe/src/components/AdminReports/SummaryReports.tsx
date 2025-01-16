import React, { useState } from "react";
import styled from "styled-components";
import { Product } from "../../definitions/Product";
import InventoryTable from "./InventoryTable";
import PaginationControls from "./PaginationControls";
import WeeklyRequests from "./WeeklyRequests";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f7f7f7;
`;

const InventorySummaryContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SummaryReports: React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const inventoryData: Product[] = [
    { name: "Laptop", tag: "Electronics", link: "/laptop", price: 1000, quantity: 5, description: "High-performance laptop" },
    { name: "Chair", tag: "Furniture", link: "/chair", price: 120, quantity: 10, description: "Ergonomic office chair" },
    { name: "Book", tag: "Stationery", link: "/book", price: 15, quantity: 25, description: "Programming book" },
    { name: "Phone", tag: "Electronics", link: "/phone", price: 800, quantity: 8, description: "Smartphone" },
    { name: "Desk", tag: "Furniture", link: "/desk", price: 200, quantity: 3, description: "Wooden office desk" },
    { name: "Headphones", tag: "Electronics", link: "/headphones", price: 150, quantity: 12, description: "Noise-cancelling headphones" },
  ];

  const totalPages = Math.ceil(inventoryData.length / itemsPerPage);
  const paginatedData = inventoryData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <PageContainer>
      <WeeklyRequests />
      <InventorySummaryContainer>
        <h2>Inventory Summary</h2>
        <InventoryTable data={paginatedData} />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </InventorySummaryContainer>
    </PageContainer>
  );
};

export default SummaryReports;

