import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  width: 400px;
  padding: 3rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  align-self: flex-start;
`;

const StyledText = styled.p`
  font-size: 0.9rem;
  color: #666666;
  text-align: center;
  line-height: 1.5;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: #ffa500;
    box-shadow: 0 0 4px #ffa500;
  }
`;

const Button = styled.button`
  width: 40%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: #ffa500;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e69500;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  color: #ffa500;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginCard: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSendPasswordLink = () => {
    if (!name) {
      alert("Please enter your username");
      return;
    }

    alert(`Password link sent. Please check your mobile phone and follow the given instructions to reset your password.`); // Update the alert message as per your requirement
    // Add logic for sending password link
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Card>
      <BackButton onClick={handleBack}>Back to Login</BackButton>
      <Title>Enter your name</Title>
      <InputContainer>
        <Input
          type="text"
          placeholder="Registered name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputContainer>
      <StyledText>
        We will send you a unique link through your mobile number to reset your
        password.
      </StyledText>
      <Button onClick={handleSendPasswordLink}>Send Password Link</Button>
    </Card>
  );
};

export default LoginCard;

