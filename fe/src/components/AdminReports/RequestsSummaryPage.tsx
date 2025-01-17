import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import HeaderSummary from "./WeeklyRequestsComponents/HeaderSummary";
import PurchaseRequestsLogs from "./WeeklyRequestsComponents/PurchaseRequestsLogs";
import VoucherRequestsLogs from "./WeeklyRequestsComponents/VoucherRequestsLogs";
import { GET_ALL_REQUESTS, GET_ALL_VOUCHERS } from "../../gql/ops";
import LoadingScreen from "../General/LoadingScreen";

const PageContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
`;

const RequestsSummaryPage: React.FC = () => {
  const { data: purchaseData, loading: loadingPurchases, error: errorPurchases } = useQuery(GET_ALL_REQUESTS);
  const { data: voucherData, loading: loadingVouchers, error: errorVouchers } = useQuery(GET_ALL_VOUCHERS);

  if (loadingPurchases || loadingVouchers) return <LoadingScreen />;
  if (errorPurchases || errorVouchers) return <p>Error: Unable to fetch data</p>;

  const totalPurchaseRequests = purchaseData?.getAllRequests?.requestsCount || 0;
  const totalVoucherRequests = voucherData?.getAllVouchers?.vouchersCount || 0;

  const purchaseRequests = purchaseData?.getAllRequests?.requests.map((req: any) => ({
    requestId: req.request_id,
    userName: req.name,
    productName: req.product,
    quantity: req.quantity,
    totalPrice: req.price * req.quantity,
    requestDate: req.request_time,
    status: req.status,
  }));

  const voucherRequests = voucherData?.getAllVouchers?.vouchers.map((voucher: any) => ({
    requestId: voucher.voucher_id,
    userName: voucher.name,
    taskDescription: voucher.task,
    voucherAmount: voucher.amount,
    requestDate: voucher.request_time,
    responseDate: voucher.response_time,
    status: voucher.status,
  }));

  return (
    <PageContainer>
      <h2>Requests Insights</h2>
      <HeaderSummary
        totalPurchaseRequests={totalPurchaseRequests}
        totalVoucherRequests={totalVoucherRequests}
      />
      <PurchaseRequestsLogs requests={purchaseRequests} />
      <VoucherRequestsLogs requests={voucherRequests} />
    </PageContainer>
  );
};

export default RequestsSummaryPage;

