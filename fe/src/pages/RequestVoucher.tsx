import styled from "styled-components";
import { useState, ChangeEvent, FormEvent } from "react";
import UserPageHeader from "../components/General/UserPageHeader";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_VOUCHER, GET_USER } from "../gql/ops";
import ErrorModal from "../components/General/ErrorModal";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
  position: relative;
`;

const CollectUserData: React.FC = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(true);
  const [amount, setAmount] = useState<number>(0);
  const [task, setTask] = useState<string>("");

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, {});
  const [createVoucher, { data: voucherData, loading: voucherLoading, error: voucherError }] = useMutation(CREATE_VOUCHER);

  if (userLoading || voucherLoading) return <p>Loading...</p>;

  const user = !userError && userData.getUser;

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAmount(value);
  };

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createVoucher({ variables: { voucher: { amount: amount, task: task } } });
    setAmount(0);
    setTask("");
    navigate("/dashboard");
  };

  const handleCloseError = () => setShowError(false);

  return (
    <PageContainer>
      {(userError || voucherError) && showError && (
        <ErrorModal error={userError || voucherError} close={handleCloseError} />
      )}
      <UserPageHeader user={user} />
      <FormContainer>
        <Title>Enter Voucher Request</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
          <Input
            type="text"
            placeholder="Task"
            value={task}
            onChange={handleTaskChange}
            required
          />
          <Button type="submit">Submit</Button>
        </Form>
      </FormContainer>
    </PageContainer>
  );
};

export default CollectUserData;
