import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 4px 8px;
  flex: 0.5;
  border: 1px solid #ccc;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 8px;
  font-size: 14px;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

interface SearchBarProps {
  query: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearchChange }) => {
  return (
    <SearchContainer>
      <SearchInput
        value={query}
        placeholder="Search by item name or description"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <SearchButton>🔍</SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;

