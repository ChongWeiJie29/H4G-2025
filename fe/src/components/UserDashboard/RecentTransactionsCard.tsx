import styled from 'styled-components';

const Card = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RecentTransactionsCard = () => {
  return (
    <Card>
      <h2>Recent Transactions</h2>
      <p>Your transaction history goes here.</p>
    </Card>
  );
};

export default RecentTransactionsCard;

