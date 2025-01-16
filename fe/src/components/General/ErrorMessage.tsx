import React from "react";
import styled from "styled-components";
import { ApolloError } from "@apollo/client";

const ErrorMessageTag = styled.div`
  color: red;
  font-size: 1rem;
  margin-top: 20px;
`;

const ErrorMessage: React.FC<{ error: ApolloError | undefined }> = ({ error }) => {
  return (
    <ErrorMessageTag>
      {error && error.message}
    </ErrorMessageTag>
  );
};

export default ErrorMessage;
