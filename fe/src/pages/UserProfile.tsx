import React from "react";
import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SideBarMenu from "../components/General/SideBarMenu";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../gql/ops";
import ErrorMessage from "../components/General/ErrorMessage";

// Styled Components
const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
  position: relative;
`;

const ProfileDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: #495057;
`;

const Value = styled.span`
  color: #6c757d;
`;

const Tooltip = styled.div`
  position: absolute;
  top: -5px;
  left: 110%;
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

// Main Component
const UserProfile: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER, {});

  if (loading) return <p>Loading...</p>;
  const user = !error && data.getUser;

  return (
    <ProfilePageContainer>
      {error && (
        <ErrorMessage error={error} />
      )}
      <UserPageHeader user={user} />
      <ProfileDetailsContainer>
        <ProfileItem>
          <Label>Name:</Label>
          <Value>{user.name}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Email:</Label>
          <Value>{user.email}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Password:</Label>
          <Value>********</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Phone:</Label>
          <Value>{user.phone}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Status:</Label>
          <Value>{user.status}</Value>
        </ProfileItem>
        <ProfileItem>
          <TooltipWrapper>
            <Label>Active Account:</Label>
            <Tooltip>
              This field indicates whether this account is currently active /
              suspended.
            </Tooltip>
          </TooltipWrapper>
          <Value>{user.isactive ? "Yes" : "No"}</Value>
        </ProfileItem>
        <ProfileItem>
          <Label>Voucher Credits:</Label>
          <Value>{user.voucher || "No vouchers available"}</Value>
        </ProfileItem>
      </ProfileDetailsContainer>
      <SideBarMenu />
    </ProfilePageContainer>
  );
};

export default UserProfile;
