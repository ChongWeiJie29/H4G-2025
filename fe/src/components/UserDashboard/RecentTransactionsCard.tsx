import React from "react";
import styled from "styled-components";
import MockUser from "../../mockDatabase/MockUser";

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
  grid-template-columns: 1fr 3fr 1fr; /* Three columns */
  align-items: center;
  font-size: 0.9rem;
  gap: 1rem;
`;

const Amount = styled.span<{ type: "in" | "out" }>`
  font-weight: bold;
  color: ${(props) => (props.type === "in" ? "green" : "red")};
`;

const RecentTransactionsCard: React.FC = () => {
  const { transactions } = MockUser; // Access transactions from mock user data

  return (
    <Card>
      <h2>Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p>No recent transactions.</p>
      ) : (
        <TransactionList>
          {transactions.map((transaction) => {
            const transactionDate = new Date(transaction.date);

            return (
              <TransactionItem key={transaction.id}>
                <DateRow>{transactionDate.toLocaleDateString()}</DateRow>
                <TransactionRow>
                  <span>{transactionDate.toLocaleTimeString()}</span>
                  <span>{transaction.description}</span>
                  <Amount type={transaction.type}>
                    {transaction.type === "in" ? "+" : "-"}{transaction.amount}
                  </Amount>
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

