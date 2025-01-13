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
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 1rem;
  align-self: flex-start;
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
  width: 6rem;
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

const ForgotPasswordLink = styled.a`
  font-size: 0.875rem;
  color: black;
  text-decoration: underline;
  align-self: flex-end;
  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const EyeIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card>
      <Title>Sign in</Title>
      <InputContainer>
        <Input type="text" placeholder="Username" />
      </InputContainer>
      <InputContainer>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <EyeIcon
          src={showPassword ? "/images/show.png" : "/images/hide.png"}
          alt="Toggle password visibility"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      </InputContainer>
      <ForgotPasswordLink href="#">Forgot your password?</ForgotPasswordLink>
      <Button onClick={() => navigate("/")}>Sign in</Button>
    </Card>
  );
};

export default LoginCard;
