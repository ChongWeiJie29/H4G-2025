import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_USER_REQUESTS } from "../../gql/ops";
import LoadingScreen from "../General/LoadingScreen";
import { Transaction, RequestType } from "../../definitions/Transaction";

// Styled components
const Card = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TransactionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TransactionItem = styled.li`
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const DateRow = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 5px;
`;

const TransactionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Adjusted grid layout */
  align-items: center;
  font-size: 0.9rem;
  gap: 1rem;
`;

const StatusBadge = styled.span<{ status: RequestType }>`
  font-weight: bold;
  color: ${(props) => {
    switch (props.status) {
      case RequestType.accepted:
        return "green";
      case RequestType.rejected:
        return "red";
      case RequestType.pending:
      default:
        return "orange";
    }
  }};
`;

const Amount = styled.span<{ type: "in" | "out" }>`
  font-weight: bold;
  color: ${(props) => (props.type === "in" ? "green" : "red")};
`;

const RecentTransactionsCard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER_REQUESTS);

  if (loading) return <LoadingScreen />;

  if (error) {
    return <p>Error loading transactions.</p>;
  }

  const transactions: Transaction[] = data.getUserRequests.requests.filter(
    (item: Transaction) => (item.status === RequestType.accepted) || (item.status === RequestType.rejected)
  );
  const transactionsCount: number = data.getUserRequests.requestsCount || 0;

  return (
    <Card>
      <h2>Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p>No recent transactions.</p>
      ) : (
        <TransactionList>
          {transactions.map((transaction) => {
            const requestTime = new Date(transaction.request_time);

            return (
              <TransactionItem key={transaction.request_id}>
                <DateRow>{requestTime.toLocaleDateString()}</DateRow>
                <TransactionRow>
                  <span>{requestTime.toLocaleTimeString()}</span>
                  <span>
                    {transaction.product} ({transaction.quantity}x) 
                  </span>
                  <span>
                    <StatusBadge status={transaction.status}>
                      {transaction.status}
                    </StatusBadge>
                  </span>
                  <Amount type="out">- {transaction.price * transaction.quantity} 💳</Amount>
                </TransactionRow>
              </TransactionItem>
            );
          })}
        </TransactionList>
      )}
    </Card>
  );
};

export default RecentTransactionsCard;
