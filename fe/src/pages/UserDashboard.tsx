import styled from 'styled-components';
import VoucherBalanceCard from '../components/UserDashboard/VoucherBalanceCard';
import RecentTransactionsCard from '../components/UserDashboard/RecentTransactionsCard';
import NotificationsCard from '../components/UserDashboard/NotificationsCard';
import AvailableProductsCard from '../components/UserDashboard/AvailableProductsCard';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DashboardBody = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const UserDashboard = () => {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>Welcome back, Sir</h1>
        <ProfilePicture
          src="/path-to-profile-picture.jpg"
          alt="Profile"
        />
      </DashboardHeader>
      <DashboardBody>
        <CardContainer>
          <VoucherBalanceCard />
          <RecentTransactionsCard />
          <NotificationsCard />
        </CardContainer>
        <AvailableProductsCard />
      </DashboardBody>
    </DashboardContainer>
  );
};

export default UserDashboard;

