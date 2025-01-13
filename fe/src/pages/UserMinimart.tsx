import React, { useState } from "react";
import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SideBarMenu from "../components/General/SideBarMenu";
import ProductCard from "../components/UserMinimart/ProductCard";
import FilterTags from "../components/UserMinimart/FilterTags";
import SearchBar from "../components/UserMinimart/SearchBar";
import MockProducts from "../mockDatabase/MockProducts";
import FilterModal from "../components/UserMinimart/FilterModal";
import MockUser from "../mockDatabase/MockUser";
import { useNavigate } from "react-router-dom"

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

const Toolbar = styled.div`
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
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const VoucherButton = styled.button`
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  gap: 0 0.3rem;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ShoppingCartButton = styled.button`
  background: #fff;
  border: 2px solid #aaa;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
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

  const navigate = useNavigate();

  return (
    <MinimartContainer>
      <UserPageHeader />
      <MinimartBody>
        <Toolbar>
          <SearchBar query={searchQuery} onSearchChange={setSearchQuery} />
          <FilterButton onClick={() => setFilterModalOpen(true)}>
            Filters
          </FilterButton>
          <VoucherButton>
            <span style={{ marginRight: "8px" }}>💳</span>
            <p>: {MockUser.voucherAmount}</p>
          </VoucherButton>
          <ShoppingCartButton>
            <img src="/images/shopping-cart.png" alt="cart" width="35" onClick={() => navigate("/cart")}/>
          </ShoppingCartButton>
        </Toolbar>
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
