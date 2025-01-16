import React from "react";
import styled from "styled-components";
import { Transaction, RequestType } from "../../definitions/Transaction";
import { Voucher, VoucherType } from "../../definitions/Voucher";

// Styled components
const Card = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TransactionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TransactionItem = styled.li`
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const DateRow = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 5px;
`;

const TransactionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Adjusted grid layout */
  align-items: center;
  font-size: 0.9rem;
  gap: 1rem;
`;

const StatusBadge = styled.span<{ status: RequestType | VoucherType }>`
  font-weight: bold;
  color: ${(props) => {
    switch (props.status) {
      case RequestType.accepted:
      case VoucherType.accepted:
        return "green";
      case RequestType.rejected:
      case VoucherType.rejected:
        return "red";
      case RequestType.pending:
      case VoucherType.pending:
      default:
        return "orange";
    }
  }};
`;

const Amount = styled.span<{ type: "in" | "out" }>`
  font-weight: bold;
  color: ${(props) => (props.type === "in" ? "green" : "red")};
`;

interface Props {
  doneVouchers: Voucher[];
  doneRequests: Transaction[];
}

const RecentTransactionsCard: React.FC<Props> = ({ doneVouchers, doneRequests }) => {
  const combinedItems = [
    ...doneRequests.map((transaction) => ({ ...transaction, type: "transaction" })),
    ...doneVouchers.map((voucher) => ({ ...voucher, type: "voucher" })),
  ].sort((a, b) => new Date(b.request_time).getTime() - new Date(a.request_time).getTime());

  return (
    <Card>
      <h2>Recent Transactions and Vouchers</h2>
      {combinedItems.length === 0 ? (
        <p>No recent activity.</p>
      ) : (
        <TransactionList>
          {combinedItems.map((item) => {
            if (item.type === "transaction") {
              const request = item as Transaction;
              return (
                <TransactionItem key={request.request_id}>
                  <DateRow>{new Date(request.request_time).toLocaleString()} - Product Request</DateRow>
                  <TransactionRow>
                    <span>{request.product} ({request.quantity}x)</span>
                    <span>
                      <StatusBadge status={request.status}>
                        {request.status}
                      </StatusBadge>
                    </span>
                    <Amount type={request.status === RequestType.accepted ? 'out' : 'in'}>
                      {request.status === RequestType.accepted ? '- ' : '+ ' }
                      {request.price * request.quantity} 💳
                    </Amount>
                  </TransactionRow>
                </TransactionItem>
              );
            } else {
              const voucher = item as Voucher;
              return (
                <TransactionItem key={voucher.voucher_id}>
                  <DateRow>{new Date(voucher.request_time).toLocaleString()} - Voucher</DateRow>
                  <TransactionRow>
                    <span>{voucher.task}</span>
                    <span>
                      <StatusBadge status={voucher.status}>
                        {voucher.status}
                      </StatusBadge>
                    </span>
                    {voucher.status === VoucherType.accepted
                      ? <Amount type="in">+ {voucher.amount} 💳</Amount>
                      : 'N/A'
                    }
                  </TransactionRow>
                </TransactionItem>
              );
            }
          })}
        </TransactionList>
      )}
    </Card>
  );
};

export default RecentTransactionsCard;
