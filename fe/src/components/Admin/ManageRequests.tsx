import { useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import LoadingScreen from "../General/LoadingScreen";
import { GET_VOUCHER_REQUESTS, GET_PRODUCT_REQUESTS, UPDATE_VOUCHER_STATUS, UPDATE_PRODUCT_STATUS } from "../../gql/ops";
import { Voucher, VoucherType } from "../../definitions/Voucher";
import { RequestType, Transaction } from "../../definitions/Transaction";
import React, { useState, useEffect } from "react";

// Styled Components
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Section = styled.div`
  flex: 1;
  min-width: 600px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  td {
    font-size: 0.95rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1rem;
  margin-top: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Select = styled.select`
  padding: 5px;
  font-size: 0.9rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const formatDate = (date: Date): string =>
  new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const ManageRequests: React.FC = () => {
  const { loading: vouchersLoading, error: vouchersError, data: vouchersData } = useQuery(GET_VOUCHER_REQUESTS);
  const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_PRODUCT_REQUESTS);

  const [updateVoucherStatus] = useMutation(UPDATE_VOUCHER_STATUS);
  const [updateProductStatus] = useMutation(UPDATE_PRODUCT_STATUS);

  const [voucherRequests, setVoucherRequests] = useState<Voucher[]>([]);
  const [productRequests, setProductRequests] = useState<Transaction[]>([]);

  useEffect(() => {
    if (vouchersData?.getAllPendingVouchers?.vouchers) {
      setVoucherRequests(vouchersData.getAllPendingVouchers.vouchers);
    }
  }, [vouchersData]);

  useEffect(() => {
    if (productsData?.getAllPendingRequests?.requests) {
      setProductRequests(productsData.getAllPendingRequests.requests);
    }
  }, [productsData]);

  if (vouchersLoading || productsLoading) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  if (vouchersError || productsError) {
    return <ErrorMessage>Failed to load requests. Please try again later.</ErrorMessage>;
  }

  const pendingVouchersCount = vouchersData?.getAllPendingVouchers?.vouchersCount || 0;
  const pendingRequestsCount = productsData?.getAllPendingRequests?.requestsCount || 0;

  const handleVoucherStatusChange = (id: number, newStatus: VoucherType) => {
    const updatedVouchers = voucherRequests.map((voucher) =>
      voucher.voucher_id === id ? { ...voucher, status: newStatus } : voucher
    );
    setVoucherRequests(updatedVouchers);

    updateVoucherStatus({
      variables: { details: { voucher_id: id, status: newStatus } },
      optimisticResponse: {
        updateVoucherStatus: {
          __typename: "Voucher",
          voucher_id: id,
          status: newStatus,
        },
      },
    });
  };

  const handleProductStatusChange = (id: number, newStatus: RequestType) => {
    const updatedRequests = productRequests.map((request) =>
      request.request_id === id ? { ...request, status: newStatus } : request
    );
    setProductRequests(updatedRequests);
    updateProductStatus({
      variables: { details: { request_id: id, status: newStatus } },
      optimisticResponse: {
        updateProductStatus: {
          __typename: "Transaction",
          request_id: id,
          status: newStatus,
        },
      },
    });
  };

  return (
    <Container>
      <Section>
        <SectionHeader>
          <Title>{pendingVouchersCount} Voucher Requests</Title>
        </SectionHeader>
        <Table>
          <thead>
            <tr>
              <th>Voucher ID</th>
              <th>Name</th>
              <th>Task</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Request Time</th>
              <th>Response Time</th>
            </tr>
          </thead>
          <tbody>
            {voucherRequests.map((voucher) => (
              <tr key={voucher.voucher_id}>
                <td>{voucher.voucher_id}</td>
                <td>{voucher.name}</td>
                <td>{voucher.task}</td>
                <td>{`$${voucher.amount.toFixed(2)}`}</td>
                <td>
                  <Select
                    value={voucher.status}
                    onChange={(e) =>
                      handleVoucherStatusChange(voucher.voucher_id, e.target.value as VoucherType)
                    }
                  >
                    {Object.values(VoucherType).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                </td>
                <td>{formatDate(voucher.request_time)}</td>
                <td>{voucher.response_time ? formatDate(voucher.response_time) : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      {/* Product Requests Section */}
      <Section>
        <SectionHeader>
          <Title>{pendingRequestsCount} Product Requests</Title>
        </SectionHeader>
        <Table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Name</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Request Time</th>
              <th>Response Time</th>
            </tr>
          </thead>
          <tbody>
            {productRequests.map((request) => (
              <tr key={request.request_id}>
                <td>{request.request_id}</td>
                <td>{request.name}</td>
                <td>{request.product}</td>
                <td>{`$${request.price.toFixed(2)}`}</td>
                <td>{request.quantity}</td>
                <td>
                  <Select
                    value={request.status}
                    onChange={(e) =>
                      handleProductStatusChange(request.request_id, e.target.value as RequestType)
                    }
                  >
                    {Object.values(RequestType).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                </td>
                <td>{formatDate(request.request_time)}</td>
                <td>{request.response_time ? formatDate(request.response_time) : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </Container>
  );
};

export default ManageRequests
