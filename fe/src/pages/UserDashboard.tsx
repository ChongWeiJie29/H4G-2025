import styled from "styled-components";
import RecentTransactionsCard from "../components/UserDashboard/RecentTransactionsCard";
import NotificationsCard from "../components/UserDashboard/NotificationsCard";
import AvailableProductsCard from "../components/UserDashboard/AvailableProductsCard";
import SidebarMenu from "../components/General/SideBarMenu";
import UserPageHeader from "../components/General/UserPageHeader";
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS, GET_USER, GET_USER_VOUCHERS } from "../gql/ops";
import ErrorModal from "../components/General/ErrorModal";
import { useState } from "react";
import LoadingScreen from "../components/General/LoadingScreen";

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

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);
  const { loading: vouchersLoading, error: vouchersError, data: vouchersData } = useQuery(GET_USER_VOUCHERS);
  const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_ALL_PRODUCTS);
  
  if (userLoading || vouchersLoading || productsLoading) return <LoadingScreen />;

  const user = userError ? null : userData?.getUser;
  const pendingVouchers = vouchersError ? [] : vouchersData?.getUserVouchers?.vouchers || [];
  const pendingVouchersCount = vouchersError ? 0 : vouchersData?.getUserVouchers?.vouchersCount || 0;
  const products = productsError ? [] : productsData?.getAllAvailableProducts?.products || [];
  const productsCount = productsError ? 0 : productsData?.getAllAvailableProducts?.productsCount || 0;

  const handleCloseError = () => setShowError(false);

  return (
    <DashboardContainer>
      {(userError || vouchersError || productsError) && showError && (
        <ErrorModal error={userError || vouchersError || productsError} close={handleCloseError} />
      )}
      <UserPageHeader user={user} />
      <DashboardBody>
        <CardContainer>
          <RecentTransactionsCard />
          <NotificationsCard pendingVouchers={pendingVouchers} pendingVouchersCount={pendingVouchersCount} />
        </CardContainer>
        <AvailableProductsCard products={products} productsCount={productsCount} />
      </DashboardBody>
      <SidebarMenu />
    </DashboardContainer>
  );
};

export default UserDashboard;
