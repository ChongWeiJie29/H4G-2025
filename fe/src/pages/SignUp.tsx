import React from "react";
import styled from "styled-components";
import SignUpCard from "../components/Login/SignUpCard";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

const SignUpPage: React.FC = () => {
  return (
    <Container>
      <SignUpCard />
    </Container>
  );
};

export default SignUpPage;

