import styled from "styled-components";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const UserPageHeader = () => {

    const navigate = useNavigate();
  return (
    <Header>
      <img
        src="/images/company_logo_small.png"
        alt="company_logo"
        height="80"
        onClick={() => navigate("/")}
      ></img>
      <ProfileDropdown profilePic="/images/profile-user.png" />
    </Header>
  );
};

export default UserPageHeader;
