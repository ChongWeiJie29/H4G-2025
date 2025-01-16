import React, { useState } from "react";
import styled from "styled-components";

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
  margin-top: 2rem;
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

const CreatePasswordCard: React.FC = () => {
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card>
      <Title>Create new Password</Title>
      <InputContainer>
        <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <EyeIcon
          src={showPassword ? "/images/show.png" : "/images/hide.png"}
          alt="Toggle password visibility"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      </InputContainer>
      <InputContainer>
        <Input type={showPassword ? "text" : "password"} placeholder="Retype Password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} />
        <EyeIcon
          src={showPassword ? "/images/show.png" : "/images/hide.png"}
          alt="Toggle password visibility"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      </InputContainer>
      <Button onClick={() => {}}>Submit</Button>
    </Card>
  );
};

export default CreatePasswordCard;
