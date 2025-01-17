import React, { useState } from "react";
import styled from "styled-components";
import StatusFilter from "./StatusFilter";

const LogsContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

interface PurchaseRequest {
  requestId: string;
  userName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  requestDate: string;
  status: string;
}

interface PurchaseRequestsLogsProps {
  requests: PurchaseRequest[];
}

const PurchaseRequestsLogs: React.FC<PurchaseRequestsLogsProps> = ({ requests }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Filter and search logic
  const filteredRequests = requests.filter((request) => {
    const matchesStatus =
      !selectedStatus || request.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch =
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.productName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination buttons
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <LogsContainer>
      <h3>Purchase Requests Logs</h3>
    
      {/* Search Bar */}
      <SearchBar
        type="text"
        placeholder="Search by user name, product name, or request ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

       <StatusFilter
        selectedStatus={selectedStatus}
        onFilterChange={(status) => {
          setSelectedStatus(status);
          setCurrentPage(1);
        }}
      />

      {/* Requests Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Request ID</TableHeader>
            <TableHeader>User Name</TableHeader>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Total Price</TableHeader>
            <TableHeader>Request Date</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {paginatedRequests.map((request) => (
            <TableRow key={request.requestId}>
              <TableData>{request.requestId}</TableData>
              <TableData>{request.userName}</TableData>
              <TableData>{request.productName}</TableData>
              <TableData>{request.quantity}</TableData>
              <TableData>${request.totalPrice.toFixed(2)}</TableData>
              <TableData>{new Date(request.requestDate).toLocaleDateString()}</TableData>
              <TableData>{request.status}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <PaginationContainer>
        <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </PaginationButton>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <PaginationButton onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </PaginationButton>
      </PaginationContainer>
    </LogsContainer>
  );
};

export default PurchaseRequestsLogs;

