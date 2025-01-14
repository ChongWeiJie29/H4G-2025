import React from "react";
import styled from "styled-components";
import { ApolloError } from "@apollo/client";

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledModalContent = styled.div`
  background: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalTitle = styled.h2`
  margin-bottom: 10px;
  color: #333;
`;

const ModalMessage = styled.p`
  margin-bottom: 20px;
  color: #555;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorModal: React.FC<{ error: ApolloError | undefined, close: () => void }> = ({ error, close }) => {
  return (
    <StyledModalOverlay>
      <StyledModalContent>
      <ModalTitle>Error</ModalTitle>
      <ModalMessage>
        {error && error.message}
        <p>{`psst... sometimes the first request may take awhile! 
        as we are broke students running free server instances... 
        As patience is a virtue, do wait for about 1 min for the server to boot up again 
        after the first request and try again :>`}</p>
      </ModalMessage>
      <ModalButton onClick={close}>Close</ModalButton>
      </StyledModalContent>
    </StyledModalOverlay>
  );
};

export default ErrorModal;
