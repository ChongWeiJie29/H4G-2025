import styled from "styled-components";
import RecentTransactionsCard from "../components/UserDashboard/RecentTransactionsCard";
import NotificationsCard from "../components/UserDashboard/NotificationsCard";
import AvailableProductsCard from "../components/UserDashboard/AvailableProductsCard";
import SidebarMenu from "../components/General/SideBarMenu";
import UserPageHeader from "../components/General/UserPageHeader";
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS, GET_USER, GET_USER_REQUESTS, GET_USER_VOUCHERS } from "../gql/ops";
import LoadingScreen from "../components/General/LoadingScreen";
import { Voucher, VoucherType } from "../definitions/Voucher";
import { RequestType, Transaction } from "../definitions/Transaction";
import ErrorMessage from "../components/General/ErrorMessage";

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
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);
  const { loading: vouchersLoading, error: vouchersError, data: vouchersData } = useQuery(GET_USER_VOUCHERS);
  const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_ALL_PRODUCTS);
  const { loading: requestsLoading, error: requestsError, data: requestsData } = useQuery(GET_USER_REQUESTS);
  
  if (userLoading || vouchersLoading || productsLoading || requestsLoading) return <LoadingScreen />;

  const user = userError ? null : userData?.getUser;

  const pendingVouchers: Voucher[] = vouchersError ? [] : vouchersData.getUserVouchers.vouchers.filter(
    (item: Voucher) => item.status === VoucherType.pending);
  const pendingVouchersCount: number = pendingVouchers.length;
  const pendingRequests: Transaction[] = requestsError ? [] : requestsData.getUserRequests.requests.filter(
    (item: Transaction) => item.status === RequestType.pending);
  const pendingRequestsCount: number = pendingRequests.length;

  const doneVouchers: Voucher[] = vouchersError ? [] : vouchersData.getUserVouchers.vouchers.filter(
    (item: Voucher) => item.status !== VoucherType.pending);
  const doneRequests: Transaction[] = requestsError ? [] : requestsData.getUserRequests.requests.filter(
    (item: Transaction) => item.status !== RequestType.pending);

  const products = productsError ? [] : productsData?.getAllAvailableProducts?.products;
  const productsCount = productsError ? 0 : productsData?.getAllAvailableProducts?.productsCount;

  return (
    <DashboardContainer>
      {(userError || vouchersError || productsError) && (
        <ErrorMessage error={userError || vouchersError || productsError} />
      )}
      <UserPageHeader user={user} />
      <DashboardBody>
        <CardContainer>
          <RecentTransactionsCard 
            doneVouchers={doneVouchers}
            doneRequests={doneRequests} />
          <NotificationsCard pendingVouchers={pendingVouchers} pendingVouchersCount={pendingVouchersCount}
            pendingRequests={pendingRequests} pendingRequestsCount={pendingRequestsCount} />
        </CardContainer>
        <AvailableProductsCard products={products} productsCount={productsCount} />
      </DashboardBody>
      <SidebarMenu />
    </DashboardContainer>
  );
};

export default UserDashboard;
