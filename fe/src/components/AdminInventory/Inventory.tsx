import React, { useState } from "react";
import styled from "styled-components";
import SideBarMenu from "../General/SideBarMenu";
import ProductCard from "./AdminProductCard";
import FilterTags from "../UserMinimart/FilterTags";
import SearchBar from "../UserMinimart/SearchBar";
import FilterModal from "../UserMinimart/FilterModal";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../../gql/ops";
import { Product } from "../../definitions/Product";
import ErrorModal from "../General/ErrorModal";
import LoadingScreen from "../General/LoadingScreen";

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

const SearchBarAndFilter = styled.div`
  display: flex;
  gap: 0 1rem;
  flex: 0.6;
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  pointer-events: ${({ isVisible }) => (isVisible ? "all" : "none")};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 999; /* Ensure it's above all other components */
`;

const Inventory: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [showError, setShowError] = useState(true);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        cost: null as number | null,
        type: null as string | null,
        inStock: false,
    });

    const handleCloseError = () => setShowError(false);

    const {
        loading: productLoading,
        error: productError,
        data: productData,
    } = useQuery(GET_ALL_PRODUCTS, {});
    if (productLoading) return <LoadingScreen />;

    const products: Product[] = productError
        ? []
        : productData.getAllAvailableProducts.products;

    // filter products based on search query and filters
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCost = filters.cost === null || product.price <= filters.cost;
        const matchesType = filters.type === null || product.tag === filters.type;
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
        <>
            <Overlay isVisible={isFilterModalOpen || isConfirmationModalOpen} />
            <MinimartContainer>
                {productError && showError && (
                    <ErrorModal error={productError} close={handleCloseError} />
                )}
                <MinimartBody>
                    <Toolbar>
                        <SearchBarAndFilter>
                            <SearchBar query={searchQuery} onSearchChange={setSearchQuery} />
                            <FilterButton onClick={() => setFilterModalOpen(true)}>
                                Filters
                            </FilterButton>
                        </SearchBarAndFilter>
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
        </>
    );
};

export default Inventory;
