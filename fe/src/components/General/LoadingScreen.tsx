import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);  /* Transparent white background */
  z-index: 9999;
`;

const LoadingSpinner = styled.div`
  border: 8px solid #f3f3f3;  /* Light gray background */
  border-top: 8px solid #3498db;  /* Blue spinner */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1.5s linear infinite;
`;

const LoadingMessage = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <LoadingContainer>
      <div>
        <LoadingSpinner />
        <LoadingMessage>{message}</LoadingMessage>
      </div>
    </LoadingContainer>
  );
};

export default LoadingScreen;