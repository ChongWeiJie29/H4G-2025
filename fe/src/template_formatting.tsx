import React from "react";
import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SideBarMenu from "../components/General/SideBarMenu";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
`;

const TemplateFormatPage: React.FC = () => {
  return (
    <Container>
      <UserPageHeader />

      <SideBarMenu />
    </Container>
  );
};

export default TemplateFormatPage;

