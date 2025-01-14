import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { GET_PENDING_VOUCHERS } from "../../gql/ops";
import { Voucher } from "../../definitions/Voucher";

const NotificationCardContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
`;

const NotificationText = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
`;

const VoucherList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const VoucherItem = styled.li`
  padding: 15px 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f0f8ff;
    border-color: #007bff;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
`;

const VoucherName = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const VoucherDetail = styled.span`
  font-size: 0.9rem;
  color: #777;
`;

const NoVouchersMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #888;
  margin-top: 20px;
  font-style: italic;
`;

const NotificationsCard = () => {
  const { loading, error, data } = useQuery(GET_PENDING_VOUCHERS, {});

  if (loading) return <p>Loading ...</p>;

  // Ensure data exists and handle gracefully if null or undefined
  const pendingVouchers: Voucher[] = !error && data.getPendingVouchers.vouchers;
  const pendingVouchersCount: number = !error && data.getPendingVouchers.vouchersCount;

  console.log(pendingVouchers);

  return (
    <NotificationCardContainer>
      <Title>Notifications</Title>
      <NotificationText>
        You have {pendingVouchersCount} pending voucher{pendingVouchersCount !== 1 ? "s" : ""}.
      </NotificationText>
      <VoucherList>
        {pendingVouchers.length > 0 ? (
          pendingVouchers.map((voucher, index) => (
            <VoucherItem key={index}>
              <VoucherName>{voucher.task}</VoucherName>
              <VoucherDetail>{voucher.amount} points</VoucherDetail>
            </VoucherItem>
          ))
        ) : (
          <NoVouchersMessage>No pending vouchers at the moment.</NoVouchersMessage>
        )}
      </VoucherList>
    </NotificationCardContainer>
  );
};

export default NotificationsCard;
