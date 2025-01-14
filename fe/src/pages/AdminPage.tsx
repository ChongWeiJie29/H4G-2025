import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SidebarMenu from "../components/General/SideBarMenu";
import { useState, ReactNode } from "react";
import ManageUsers from "../components/Admin/ManageUsers";
import ErrorModal from "../components/General/ErrorModal";
import LoadingScreen from "../components/General/LoadingScreen";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../gql/ops";

const AdminContainer = styled.div`
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #f4f4f4; /* Light background for the tabs container */
  border-radius: 8px; /* Rounded corners for the tabs container */
  overflow: hidden; /* Prevent buttons from sticking out */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1; /* Make all buttons equal width */
  background: ${(props) => (props.active ? "#007bff" : "#f4f4f4")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: none;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #0056b3;
    color: #fff;
  }

  &:not(:last-child) {
    border-right: 1px solid #ddd; /* Add separator between buttons */
  }

  &:focus {
    outline: none;
  }
`;

const ContentArea = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [showError, setShowError] = useState<boolean>(false);

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);
  if (userLoading) return <LoadingScreen />;

  const user = userError ? null : userData?.getUser;

  const handleCloseError = () => setShowError(false);

  const renderActiveTabContent = (): ReactNode => {
    switch (activeTab) {
      case 1:
        return <ManageUsers />;
      case 2:
        return <div>Tab 2 Content</div>;
      case 3:
        return <div>Tab 3 Content</div>;
      case 4:
        return <div>Tab 4 Content</div>;
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <AdminContainer>
      {userError && showError && 
      <ErrorModal error={userError} close={handleCloseError} />
      }
      <UserPageHeader user={user} />
      <Tabs>
        <Tab active={activeTab === 1} onClick={() => setActiveTab(1)}>
          Manage Users
        </Tab>
        <Tab active={activeTab === 2} onClick={() => setActiveTab(2)}>
          Tab 2
        </Tab>
        <Tab active={activeTab === 3} onClick={() => setActiveTab(3)}>
          Tab 3
        </Tab>
        <Tab active={activeTab === 4} onClick={() => setActiveTab(4)}>
          Tab 4
        </Tab>
      </Tabs>
      <ContentArea>{renderActiveTabContent()}</ContentArea>
      <SidebarMenu />
    </AdminContainer>
  );
};

export default AdminPage;
