import React from "react";
import styled from "styled-components";
import ForgetPasswordCard from "../components/Login/ForgetPasswordCard";

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
      <ForgetPasswordCard />
    </Container>
  );
};

export default LoginPage;

