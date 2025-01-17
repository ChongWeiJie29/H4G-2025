import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  line-height: 0;
  gap: 1rem;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${(props) => (props.isActive ? "#007bff" : "#f9f9f9")};
  color: ${(props) => (props.isActive ? "#fff" : "#333")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#0056b3" : "#e6e6e6")};
  }
`;

interface StatusFilterProps {
  selectedStatus: string | null;
  onFilterChange: (status: string | null) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onFilterChange,
}) => {
  return (
    <FilterContainer>
      <p>Status: </p>
      <FilterButtons>
        <FilterButton
          isActive={selectedStatus === null}
          onClick={() => onFilterChange(null)}
        >
          All
        </FilterButton>
        <FilterButton
          isActive={selectedStatus === "Pending"}
          onClick={() => onFilterChange("Pending")}
        >
          Pending
        </FilterButton>
        <FilterButton
          isActive={selectedStatus === "Accepted"}
          onClick={() => onFilterChange("Accepted")}
        >
          Accepted
        </FilterButton>
        <FilterButton
          isActive={selectedStatus === "Rejected"}
          onClick={() => onFilterChange("Rejected")}
        >
          Rejected
        </FilterButton>
      </FilterButtons>
    </FilterContainer>
  );
};

export default StatusFilter;
