import React, { useState } from "react";
import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SideBarMenu from "../components/General/SideBarMenu";
import ProductCard from "../components/UserMinimart/ProductCard";
import FilterTags from "../components/UserMinimart/FilterTags";
import SearchBar from "../components/UserMinimart/SearchBar";
import FilterModal from "../components/UserMinimart/FilterModal";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS, GET_USER } from "../gql/ops";
import { User } from "../definitions/User";
import { Product } from "../definitions/Product";
import ErrorModal from "../components/General/ErrorModal";

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

const VoucherDisplay = styled.button`
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0px 2rem;
  display: flex;
  align-items: center;
  gap: 0 0.3rem;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchBarAndFilter = styled.div`
  display: flex;
  gap: 0 1rem;
flex: 0.6;
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState({
    cost: null as number | null,
    type: null as string | null,
    inStock: false,
  });
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [showError, setShowError] = useState(true);

  const handleCloseError = () => setShowError(false);

  let {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_ALL_PRODUCTS, {});

  let {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {});

  if (userLoading || productLoading) return <p>Loading ...</p>;
  let error;
  if (userError) {
    error = userError;
  } else if (productError) {
    error = productError;
  }

  const products: Product[] = !error ? productData.getAllAvailableProducts.products : [];
  const user: User = !error && userData.getUser;

  // filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCost =
      filters.cost === null || product.price <= filters.cost;
    const matchesType =
      filters.type === null || product.tag === filters.type;
    const matchesStock = !filters.inStock || product.quantity > 0;

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
      {(productError || userError) && showError && (
        <ErrorModal error={error} close={handleCloseError} />
      )}
      <UserPageHeader user={user} />
      <MinimartBody>
        <Toolbar>
          <SearchBarAndFilter>
            <SearchBar query={searchQuery} onSearchChange={setSearchQuery} />
            <FilterButton onClick={() => setFilterModalOpen(true)}>
              Filters
            </FilterButton>
          </SearchBarAndFilter>
          <VoucherDisplay>
            <p>You have: {user.voucher} 💳</p>
          </VoucherDisplay>
          <ShoppingCartButton>
            <img
              src="/images/shopping-cart.png"
              alt="cart"
              width="35"
              onClick={() => navigate("/cart")}
            />
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
