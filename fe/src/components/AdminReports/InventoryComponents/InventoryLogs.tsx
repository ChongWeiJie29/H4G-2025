import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

const Container = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateFilter = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const GET_PRODUCT_LOGS = gql`
  query getAllLogs {
    getAllLogs {
      productLogs {
        log_id
        action_type
        product_name
        old_quantity
        new_quantity
        timestamp
      }
    }
  }
`;

interface ProductLog {
  log_id: string;
  action_type: string;
  product_name: string;
  old_quantity: number;
  new_quantity: number;
  timestamp: string;
}

const InventoryLogs: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PRODUCT_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p>Error fetching logs: {error.message}</p>;

  // Logs data
  const logs: ProductLog[] = data?.getAllLogs?.productLogs || [];

  // Filter logs by search term and date
  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate ? log.timestamp.startsWith(filterDate) : true;
    return matchesSearch && matchesDate;
  });

  return (
    <Container>
      <h2>Inventory Logs</h2>

      {/* Search and Filter */}
      <FilterContainer>
        <SearchBar
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DateFilter
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </FilterContainer>

      {/* Logs Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Log ID</TableHeader>
            <TableHeader>Action Type</TableHeader>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Old Quantity</TableHeader>
            <TableHeader>New Quantity</TableHeader>
            <TableHeader>Timestamp</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {filteredLogs.map((log) => (
            <TableRow key={log.log_id}>
              <TableData>{log.log_id}</TableData>
              <TableData>{log.action_type}</TableData>
              <TableData>{log.product_name}</TableData>
              <TableData>{log.old_quantity}</TableData>
              <TableData>{log.new_quantity}</TableData>
              <TableData>{new Date(log.timestamp).toLocaleString()}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default InventoryLogs;

