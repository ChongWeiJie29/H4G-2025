import styled from "styled-components";
import RecentTransactionsCard from "../components/UserDashboard/RecentTransactionsCard";
import NotificationsCard from "../components/UserDashboard/NotificationsCard";
import AvailableProductsCard from "../components/UserDashboard/AvailableProductsCard";
import SidebarMenu from "../components/General/SideBarMenu";
import UserPageHeader from "../components/General/UserPageHeader";
import { useQuery } from '@apollo/client';
import { GET_USER } from "../gql/ops";
import ErrorModal from "../components/General/ErrorModal";
import { useState } from "react";

const DashboardContainer = styled.div`
  max-width: 80vw;
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
  const [showError, setShowError] = useState(true);
  const { loading, error, data } = useQuery(GET_USER, {});

  if (loading) return <p>Loading ...</p>;
  const user = !error && data.getUser;

  const handleCloseError = () => setShowError(false);

  return (
    <DashboardContainer>
      {error && showError && (
        <ErrorModal error={error} close={handleCloseError} />
      )}
      <UserPageHeader user={user} />
      <DashboardBody>
        <CardContainer>
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
