import styled from "styled-components";
import VoucherBalanceCard from "../components/UserDashboard/VoucherBalanceCard";
import RecentTransactionsCard from "../components/UserDashboard/RecentTransactionsCard";
import NotificationsCard from "../components/UserDashboard/NotificationsCard";
import AvailableProductsCard from "../components/UserDashboard/AvailableProductsCard";
import SidebarMenu from "../components/General/SideBarMenu";
import MockUser from "../mockDatabase/MockUser";
import UserPageHeader from "../components/General/UserPageHeader";

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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

const UserDashboard = () => {
  return (
    <DashboardContainer>
      <UserPageHeader />
      <DashboardBody>
        <CardContainer>
          <VoucherBalanceCard voucherAmount={MockUser.voucherAmount} />
          <RecentTransactionsCard />
          <NotificationsCard />
        </CardContainer>
        <AvailableProductsCard />
      </DashboardBody>
      <SidebarMenu />
    </DashboardContainer>
  );
};

export default UserDashboard;
