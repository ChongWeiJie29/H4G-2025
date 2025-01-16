import React from "react";
import styled from "styled-components";
import { Product } from "../../definitions/Product";

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

interface InventoryTableProps {
  data: Product[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>ID</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Tag</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Quantity</TableHeader>
        </TableRow>
      </TableHead>
      <tbody>
        {sortedData.map((product, index) => (
          <TableRow key={index}>
            <TableData>{index + 1}</TableData>
            <TableData>{product.name}</TableData>
            <TableData>{product.tag}</TableData>
            <TableData>${product.price.toFixed(2)}</TableData>
            <TableData>{product.quantity}</TableData>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default InventoryTable;

