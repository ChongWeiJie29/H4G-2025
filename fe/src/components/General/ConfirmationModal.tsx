import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:first-child {
    background-color: #f44336;
    color: white;
  }

  &:last-child {
    background-color: #ddd;
    color: black;
  }
`;

interface ConfirmationModalProps {
  modalContent: string; // Content to display in the modal
  onClickYes: () => void; // Function to execute on "Yes"
  onClickNo: () => void; // Function to execute on "No"
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  modalContent,
  onClickYes,
  onClickNo,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <p>{modalContent}</p>
        <ModalActions>
          <ModalButton onClick={onClickYes}>Yes</ModalButton>
          <ModalButton onClick={onClickNo}>No</ModalButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;

