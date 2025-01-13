import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const FilterTag = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const FilterTags: React.FC = () => {
  const filters = ["Cost: > 10 creds", "Type: Food", "In-Stock"];

  return (
    <FilterContainer>
      {filters.map((filter, index) => (
        <FilterTag key={index}>
          {filter} <span style={{ marginLeft: "8px", cursor: "pointer" }}>❌</span>
        </FilterTag>
      ))}
    </FilterContainer>
  );
};

export default FilterTags;

