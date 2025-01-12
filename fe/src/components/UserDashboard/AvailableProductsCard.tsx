import styled from 'styled-components';

const WideCard = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const AvailableProductsCard = () => {
  return (
    <WideCard>
      <h2>Available Products</h2>
      <p>Sliding product carousel here.</p>
    </WideCard>
  );
};

export default AvailableProductsCard;

