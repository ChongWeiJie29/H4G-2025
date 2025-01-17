import React from "react";
import styled from "styled-components";
import { Filters } from "../../definitions/Filters"; 

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Tag = styled.div`
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

interface FilterTagsProps {
  filters: Filters;
  onRemoveFilter: (key: keyof Filters) => void;
}

const FilterTags: React.FC<FilterTagsProps> = ({ filters, onRemoveFilter }) => {
  const appliedFilters: { key: keyof Filters; label: string }[] = [];

  if (filters.cost !== null) appliedFilters.push({ key: "cost", label: `Cost < ${filters.cost} 💳` });
  if (filters.type !== null) appliedFilters.push({ key: "type", label: `Type: ${filters.type}` });
  if (filters.inStock) appliedFilters.push({ key: "inStock", label: "In Stock" });


  return (
    <TagContainer>
      {appliedFilters.map((filter) => (
        <Tag key={filter.key} onClick={() => onRemoveFilter(filter.key)}>
          {filter.label} ❌
        </Tag>
      ))}
    </TagContainer>
  );
};

export default FilterTags;

