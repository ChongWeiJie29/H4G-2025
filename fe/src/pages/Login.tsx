import React from "react";
import styled from "styled-components";
import LoginCard from "../components/Login/LoginCard";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

const LoginPage: React.FC = () => {
  return (
    <Container>
      <LoginCard />
    </Container>
  );
};

export default LoginPage;

