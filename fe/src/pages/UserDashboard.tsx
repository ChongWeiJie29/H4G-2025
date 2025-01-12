import styled from "styled-components";
import VoucherBalanceCard from "../components/UserDashboard/VoucherBalanceCard";
import RecentTransactionsCard from "../components/UserDashboard/RecentTransactionsCard";
import NotificationsCard from "../components/UserDashboard/NotificationsCard";
import AvailableProductsCard from "../components/UserDashboard/AvailableProductsCard";
import ProfileDropdown from "../components/General/ProfileDropdown";
import User from "../Definitions/User";

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

const UserDashboard = () => {
  const handleOptionClick = (option: string) => {
    // replace with page navigation later on
    console.log(option);
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <img src="/images/company_logo_small.png" alt="company_logo" height="80"></img>
        <ProfileDropdown
          profilePic="/images/profile-user.png"
          onOptionClick={handleOptionClick}
        />
      </DashboardHeader>
      <DashboardBody>
        <CardContainer>
          <VoucherBalanceCard voucherAmount={User.voucherAmount} />
          <RecentTransactionsCard />
          <NotificationsCard />
        </CardContainer>
        <AvailableProductsCard />
      </DashboardBody>
    </DashboardContainer>
  );
};

export default UserDashboard;
