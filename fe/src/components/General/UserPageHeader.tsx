import styled from "styled-components";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";
import React from "react";
import { User } from "../../definitions/User";
import { ApolloConsumer } from "@apollo/client";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Logo = styled.img`
  height: 60px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  margin-left: 20px;
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #495057;
  line-height: 1.5;
  &:first-child {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const VoucherInfo = styled(Paragraph)`
  font-size: 0.95rem;
  color: #6c757d;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ErrorMessageTag = styled.div`
  color: red;
  font-size: 1rem;
  margin-top: 20px;
`;

const UserPageHeader: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <ApolloConsumer>
      {(client) => (
        <Header>
          <Logo
            src="/images/company_logo_small.png"
            alt="company logo"
            onClick={() => navigate("/dashboard")}
          />
          <ProfileContainer>
            {!user.isactive && <ErrorMessageTag>Account is currently suspended.</ErrorMessageTag>}
            <UserInfo>
              <Paragraph>Hello, {user.name}</Paragraph>
              <VoucherInfo>Vouchers: {user.voucher} credits</VoucherInfo>
            </UserInfo>
            <ProfileDropdown client={client} profilePic="/images/profile-user.png" />
          </ProfileContainer>
        </Header>
      )}
    </ApolloConsumer>

  );
};

export default UserPageHeader;
