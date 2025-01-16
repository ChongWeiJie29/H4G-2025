import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import LoadingScreen from "../General/LoadingScreen";
import { DELETE_USER, GET_ALL_USERS, GET_USER, UPDATE_USER_DETAILS } from "../../gql/ops";
import { User } from "../../definitions/User";
import AddUserModal from "./AddUserModal";

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const UserCount = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1rem;
  margin-top: 20px;
`;

const darkenColor = (color: string) => color;

const ManageUsers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_ALL_USERS);
  const [deleteUser] = useMutation(DELETE_USER);
  const [updateUserStatus] = useMutation(UPDATE_USER_DETAILS);

  if (userLoading) return <LoadingScreen />;
  if (userError) return <ErrorMessage>Failed to load users. Please try again later.</ErrorMessage>;

  const users: User[] = userData.getAllUsers.users;
  const usersCount: number = userData.getAllUsers.usersCount;

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleDelete = (name: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser({ 
        variables: { user: name },
        refetchQueries: [GET_ALL_USERS],
      });
    }
  };

  const handleToggleActiveStatus = (name: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    updateUserStatus({
      variables: { details: { name: name, colName: 'isactive' , value: newStatus.toString() } },
      refetchQueries: [GET_ALL_USERS, GET_USER],
    })
  };

  return (
    <Container>
      <Header>
        <UserCount>Total Users: {usersCount}</UserCount>
        <Button onClick={handleAdd}>Add New User</Button>
      </Header>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Active</th>
            <th>Voucher Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>********</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
              <td>
                <Button 
                  color={user.isactive ? "#28a745" : "#dc3545"} 
                  onClick={() => handleToggleActiveStatus(user.name, user.isactive)}
                >
                  {user.isactive ? "Deactivate" : "Activate"}
                </Button>
              </td>
              <td>{user.voucher !== null ? `$${user.voucher}` : "No Balance"}</td>
              <td>
                <Button color="#dc3545" onClick={() => handleDelete(user.name)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isAddModalOpen && (
        <AddUserModal setIsAddModalOpen={setIsAddModalOpen} />
      )}
    </Container>
  );
};

export default ManageUsers;
