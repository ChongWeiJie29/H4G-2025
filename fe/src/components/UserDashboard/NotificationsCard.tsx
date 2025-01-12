import styled from 'styled-components';

const NotificationCard = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NotificationsCard = () => {
  return (
    <NotificationCard>
      <h2>Notification</h2>
      <p>Body text for notifications.</p>
    </NotificationCard>
  );
};

export default NotificationsCard;

