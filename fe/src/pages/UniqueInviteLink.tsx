import React from "react";
import styled from "styled-components";
import CreatePasswordCard from "../components/Login/CreatePasswordCard";

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
            <CreatePasswordCard />
        </Container>
    );
};

export default SignUpPage;
