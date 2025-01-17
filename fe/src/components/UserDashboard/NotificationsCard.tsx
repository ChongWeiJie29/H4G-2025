import styled from "styled-components";
import { Voucher } from "../../definitions/Voucher";
import { Transaction } from "../../definitions/Transaction";

const NotificationCardContainer = styled.div`
  flex: 1;
  padding: 20px;
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

const ListSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 10px;
`;

const RequestList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 200px;
  overflow-y: auto;
`;

const VoucherList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 200px;
  overflow-y: auto;
`;

const ListItem = styled.li`
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

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const ItemSubtitle = styled.span`
  font-size: 0.9rem;
  color: #777;
`;

const NoItemsMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #888;
  margin-top: 20px;
  font-style: italic;
`;

interface Props {
  pendingVouchers: Voucher[];
  pendingRequests: Transaction[];
}

const NotificationsCard = ({
  pendingVouchers,
  pendingRequests,
}: Props) => {
  return (
    <NotificationCardContainer>
      <Title>Notifications</Title>
      <NotificationText>
        You have {pendingVouchers.length} pending voucher
        {pendingVouchers.length !== 1 ? "s" : ""} and {pendingRequests.length} pending request
        {pendingRequests.length !== 1 ? "s" : ""}.
      </NotificationText>

      <ListSection>
        <SectionTitle>Pending Vouchers</SectionTitle>
        <VoucherList>
          {pendingVouchers.length > 0 ? (
            pendingVouchers.map((voucher, index) => (
              <ListItem key={index}>
                <ItemDetails>
                  <ItemTitle>{voucher.task}</ItemTitle>
                  <ItemSubtitle>{voucher.amount} 💳</ItemSubtitle>
                </ItemDetails>
              </ListItem>
            ))
          ) : (
            <NoItemsMessage>No pending vouchers at the moment.</NoItemsMessage>
          )}
        </VoucherList>
      </ListSection>

      <ListSection>
        <SectionTitle>Pending Requests</SectionTitle>
        <RequestList>
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request, index) => (
              <ListItem key={index}>
                <ItemDetails>
                  <ItemTitle>{request.product}</ItemTitle>
                  <ItemSubtitle>
                    Quantity: {request.quantity} | Total: {request.price * request.quantity} 💳
                  </ItemSubtitle>
                </ItemDetails>
                <ItemSubtitle>Status: {request.status}</ItemSubtitle>
              </ListItem>
            ))
          ) : (
            <NoItemsMessage>No pending requests at the moment.</NoItemsMessage>
          )}
        </RequestList>
      </ListSection>
    </NotificationCardContainer>
  );
};

export default NotificationsCard;
