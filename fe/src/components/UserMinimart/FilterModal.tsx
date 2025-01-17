import React, { useState } from "react";
import styled from "styled-components";
import { Filters } from "../../definitions/Filters";
import { ProductTag } from "../../definitions/Product";

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
  width: 40%;
`;

const Section = styled.div`
  margin-bottom: 16px;
`;

const SectionTitle = styled.h4`
  margin-bottom: 8px;
`;

const SectionOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 2rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
`;

const FilterButtons = styled.button`
  background: white;
  border: none;
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
  onApplyFilters: (filters: {
    cost: number | null;
    type: string | null;
    inStock: boolean;
  }) => void;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  onApplyFilters,
  onClose,
}) => {
  const [localFilters, setLocalFilters] = useState<Filters>({
    cost: null,
    type: null,
    inStock: false,
  });

  const costOptions = [20, 40, 60, 80, 100];
  const handleCheckboxChange = (key: keyof typeof localFilters, value: any) => {
    setLocalFilters((prev: Filters) => ({
      ...prev,
      [key]: prev[key] === value ? null : value, // Toggle the value
    }));
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Filters</h3>

        {/* Cost Section */}
        <Section>
          <SectionTitle>Cost</SectionTitle>
          <SectionOptions>
            {costOptions.map((cost) => (
              <CheckboxLabel key={cost}>
                <CheckboxInput
                  type="checkbox"
                  checked={localFilters.cost === cost}
                  onChange={() => handleCheckboxChange("cost", cost)}
                />
                &lt; {cost}
              </CheckboxLabel>
            ))}
          </SectionOptions>
        </Section>

        {/* Type Section */}
        <Section>
          <SectionTitle>Type</SectionTitle>
          <SectionOptions>
            {Object.values(ProductTag).map((type) => (
              <CheckboxLabel key={type}>
                <CheckboxInput
                  type="checkbox"
                  checked={localFilters.type === type}
                  onChange={() => handleCheckboxChange("type", type)}
                />
                {type}
              </CheckboxLabel>
            ))}
          </SectionOptions>
        </Section>

        {/* In-Stock Section */}
        <Section>
          <SectionTitle>Availability</SectionTitle>
          <SectionOptions>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                checked={localFilters.inStock}
                onChange={() =>
                  handleCheckboxChange("inStock", !localFilters.inStock)
                }
              />
              In Stock
            </CheckboxLabel>
          </SectionOptions>
        </Section>

        {/* Action Buttons */}
        <FilterButtons>
          <FilterButton onClick={() => onApplyFilters(localFilters)}>
            Apply
          </FilterButton>
          <FilterButton onClick={onClose}>Cancel</FilterButton>
        </FilterButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FilterModal;
