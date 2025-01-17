import styled from "styled-components";
import { useState, ChangeEvent, FormEvent } from "react";
import UserPageHeader from "../components/General/UserPageHeader";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_VOUCHER, GET_USER, GET_USER_VOUCHERS } from "../gql/ops";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/General/SideBarMenu";
import { Voucher } from "../definitions/Voucher";
import LoadingScreen from "../components/General/LoadingScreen";
import ErrorMessage from "../components/General/ErrorMessage";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
  position: relative;
`;

const FormAndVoucherContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
  max-width: 100%;
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  flex: 0 1 45%; /* Make it take up 45% of the space */
  max-width: 600px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #555;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const Button = styled.button`
  padding: 12px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const VoucherListContainer = styled.div`
  flex: 1;
  max-width: 900px;
  overflow-y: auto;
  max-height:500px;
`;

const VoucherList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const VoucherItem = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #007bff;
  transition: transform 0.2s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background-color: #f1f1f1;
  }
`;

const VoucherDetail = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin: 5px 0;
`;

const VoucherDate = styled.p`
  font-size: 0.95rem;
  color: #777;
  margin: 5px 0;
`;

const CollectUserData: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>(0);
  const [task, setTask] = useState<string>("");

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, {});
  const { loading: getVouchersLoading, error: getVouchersError, data: getVouchersData } = useQuery(GET_USER_VOUCHERS, {});
  const [createVoucher, { loading: voucherLoading, error: voucherError }] = useMutation(CREATE_VOUCHER);
  if (userLoading || voucherLoading || getVouchersLoading) return <LoadingScreen />;

  const user = !userError && userData.getUser;
  const vouchers: Voucher[] = !getVouchersError && getVouchersData.getUserVouchers.vouchers;

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAmount(value);
  };

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createVoucher({ 
      variables: { voucher: { amount: amount, task: task } },
      refetchQueries: [GET_USER_VOUCHERS] 
    });
    setAmount(0);
    setTask("");
    navigate("/dashboard");
  };

  return (
    <PageContainer>
      {(userError || voucherError || getVouchersError) && (
        <ErrorMessage error={userError || voucherError || getVouchersError} />
      )}
      <UserPageHeader user={user} />

      <FormAndVoucherContainer>
        <FormContainer>
          <Title>Enter Voucher Request</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              disabled={!user.isactive}
              type="text"
              placeholder="Task name"
              value={task}
              onChange={handleTaskChange}
              required
            />
            <Input
              disabled={!user.isactive}
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
              required
            />
            <Button type="submit">Submit</Button>
          </Form>
        </FormContainer>

        <VoucherListContainer>
          {vouchers.length > 0 ? (
            <VoucherList>
              {vouchers.map((value, index) => (
                <VoucherItem key={index}>
                  <VoucherDetail>Task: {value.task}</VoucherDetail>
                  <VoucherDetail>Amount: {value.amount} 💳</VoucherDetail>
                  <VoucherDetail>Status: {value.status}</VoucherDetail>
                  <VoucherDate>Request Time: {new Date(value.request_time).toLocaleString()}</VoucherDate>
                  <VoucherDate>Response Time: {value.response_time ? new Date(value.response_time).toLocaleString() : "N/A"}</VoucherDate>
                </VoucherItem>
              ))}
            </VoucherList>
          ) : (
            <p>No vouchers found.</p>
          )}
        </VoucherListContainer>
      </FormAndVoucherContainer>

      <SidebarMenu />
    </PageContainer>
  );
};

export default CollectUserData;
