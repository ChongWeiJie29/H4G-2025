import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 4px;
  font-size: 14px;
`;

const SearchIcon = styled.span`
  margin-right: 8px;
  color: #999;
`;

const SearchBar: React.FC = () => {
  return (
    <SearchBarContainer>
      <SearchIcon>🔍</SearchIcon>
      <SearchInput type="text" placeholder="Search for item" />
    </SearchBarContainer>
  );
};

export default SearchBar;

