import React, { useState } from "react";
import { styled } from "styled-components";
import { User, UserType } from "../../definitions/User";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../gql/ops";
import LoadingScreen from "../General/LoadingScreen";
import ErrorMessage from "../General/ErrorMessage";
import { useNavigate } from "react-router-dom";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 0.9rem;
  }

  input, select {
    width: 100%;
    padding: 8px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => props.color || "#007bff"};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.color ? darkenColor(props.color) : "#0056b3")};
  }

  &:focus {
    outline: none;
  }
`;

const darkenColor = (color: string) => color;

interface Props {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserModal: React.FC<Props> = ({ setIsAddModalOpen }) => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<User>({
    name: "",
    password: "",
    email: "",
    phone: "",
    status: UserType.resident,
    isactive: true,
    voucher: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setNewUser((prev) => ({
      ...prev,
      [name]: name === "voucher"
        ? Number(value)
        : value,
    }));
  };

  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  if (loading) return <LoadingScreen />

  const handleSubmit = () => {
    createUser({ variables: { user: newUser } });
    navigate('/admin');
    setIsAddModalOpen(false);
  }

  return (
    <ModalOverlay>
      {error && 
        <ErrorMessage error={error} />
      }
      <Modal>
        <ModalTitle>Add New User</ModalTitle>
        <FormGroup>
          <label>Name</label>
          <input
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
        </FormGroup>
        <FormGroup>
          <label>Password</label>
          <input
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            placeholder="Enter password"
          />
        </FormGroup>
        <FormGroup>
          <label>Email</label>
          <input
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Enter email"
          />
        </FormGroup>
        <FormGroup>
          <label>Phone</label>
          <input
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
            placeholder="Enter phone"
          />
        </FormGroup>
        <FormGroup>
          <label>Status</label>
          <select name="status" value={newUser.status} onChange={handleInputChange}>
            <option value="resident">Resident</option>
            <option value="admin">Admin</option>
          </select>
        </FormGroup>
        <FormGroup>
          <label>Active</label>
          <select
            name="isactive"
            value={newUser.isactive ? "true" : "false"}
            onChange={handleInputChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </FormGroup>
        <FormGroup>
          <label>Voucher Balance</label>
          <input
            name="voucher"
            type="number"
            value={newUser.voucher}
            onChange={handleInputChange}
            placeholder="Enter voucher balance"
          />
        </FormGroup>
        <Button onClick={handleSubmit}>
          Add User
        </Button>
      </Modal>
    </ModalOverlay>
  );
}

export default AddUserModal;
