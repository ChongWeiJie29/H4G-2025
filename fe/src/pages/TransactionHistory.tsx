import React from 'react';
import styled from 'styled-components';
import { RequestType, Transaction } from '../definitions/Transaction';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_USER_REQUESTS } from '../gql/ops';
import LoadingScreen from '../components/General/LoadingScreen';
import UserPageHeader from '../components/General/UserPageHeader';

// Styled Components
const Container = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 800px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  text-align: left;
  padding: 10px;
  font-size: 16px;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  color: #555;
`;

const StatusBadge = styled.span<{ status: RequestType }>`
  padding: 5px 10px;
  border-radius: 12px;
  color: #fff;
  font-size: 12px;
  text-transform: capitalize;

  background-color: ${({ status }) => {
    switch (status) {
      case RequestType.pending:
        return '#f0ad4e';
      case RequestType.accepted:
        return '#5cb85c';
      case RequestType.rejected:
        return '#d9534f';
      default:
        return '#999';
    }
  }};
`;

const TransactionHistory: React.FC = () => {
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);
  const { loading: requestsLoading, error: requestsError, data: requestsData } = useQuery(GET_USER_REQUESTS);

  if (userLoading || requestsLoading) return <LoadingScreen />
  
  const user = userError ? null : userData?.getUser;
  const transactions: Transaction[] = requestsError ? [] : requestsData.getUserRequests.requests;

  return (
    <Container>
      <UserPageHeader user={user} />
      <Title>Transaction History</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>#</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Product</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Request Time</TableHeader>
            <TableHeader>Response Time</TableHeader>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <TableRow key={transaction.request_id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{transaction.product}</TableCell>
              <TableCell>${transaction.price.toFixed(2)}</TableCell>
              <TableCell>{transaction.quantity}</TableCell>
              <TableCell>
                <StatusBadge status={transaction.status}>{transaction.status}</StatusBadge>
              </TableCell>
              <TableCell>{new Date(transaction.request_time).toLocaleString()}</TableCell>
              <TableCell>{new Date(transaction.response_time).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TransactionHistory;
