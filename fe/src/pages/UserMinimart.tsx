import React, { useState } from "react";
import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SideBarMenu from "../components/General/SideBarMenu";
import ProductCard from "../components/UserMinimart/ProductCard";
import FilterTags from "../components/UserMinimart/FilterTags";
import SearchBar from "../components/UserMinimart/SearchBar";
import MockProducts from "../mockDatabase/MockProducts";
import FilterModal from "../components/UserMinimart/FilterModal";

const MinimartContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
`;

const MinimartBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
`;

const SearchAndFilters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
  flex: 1;
`;

const FilterButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const UserMinimart: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products] = useState(MockProducts);
  const [filters, setFilters] = useState({
    cost: null as number | null,
    type: null as string | null,
    inStock: false,
  });
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  // filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCost =
      filters.cost === null || product.unitCost <= filters.cost;
    const matchesType =
      filters.type === null || product.category === filters.type;
    const matchesStock = !filters.inStock || product.quantityAvailable > 0;

    return matchesSearch && matchesCost && matchesType && matchesStock;
  });

  // Remove individual filters
  const removeFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: key === "inStock" ? false : null,
    }));
  };

  return (
    <MinimartContainer>
      <UserPageHeader />
      <MinimartBody>
        <SearchAndFilters>
          <SearchBar query={searchQuery} onSearchChange={setSearchQuery} />
          <FilterButton onClick={() => setFilterModalOpen(true)}>
            Filters
          </FilterButton>
        </SearchAndFilters>
        <FilterTags filters={filters} onRemoveFilter={removeFilter} />
        <ProductGrid>
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </ProductGrid>
      </MinimartBody>
      <SideBarMenu />
      {isFilterModalOpen && (
        <FilterModal
          filters={filters}
          onApplyFilters={(newFilters) => {
            setFilters(newFilters);
            setFilterModalOpen(false);
          }}
          onClose={() => setFilterModalOpen(false)}
        />
      )}
    </MinimartContainer>
  );
};

export default UserMinimart;
