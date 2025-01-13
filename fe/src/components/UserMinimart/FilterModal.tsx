import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  width: 300px;
`;

const FilterOption = styled.div`
  margin-bottom: 12px;
`;

const FilterButton = styled.button`
  background: #8ebdb6;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

interface FilterModalProps {
  filters: { cost: number | null; type: string | null; inStock: boolean };
  onApplyFilters: (filters: { cost: number | null; type: string | null; inStock: boolean }) => void;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ filters, onApplyFilters, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Filters</h3>
        <FilterOption>
          <label>Cost:</label>
          <input
            type="number"
            value={localFilters.cost ?? ""}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                cost: e.target.value ? parseFloat(e.target.value) : null,
              }))
            }
          />
        </FilterOption>
        <FilterOption>
          <label>Type:</label>
          <select
            value={localFilters.type ?? ""}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                type: e.target.value || null,
              }))
            }
          >
            <option value="">Any</option>
            <option value="Fruits">Fruits</option>
            <option value="Bakery">Bakery</option>
          </select>
        </FilterOption>
        <FilterOption>
          <label>
            <input
              type="checkbox"
              checked={localFilters.inStock}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, inStock: e.target.checked }))
              }
            />
            In Stock
          </label>
        </FilterOption>
        <div>
          <FilterButton onClick={() => onApplyFilters(localFilters)}>Apply</FilterButton>
          <FilterButton onClick={onClose}>Cancel</FilterButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FilterModal;

