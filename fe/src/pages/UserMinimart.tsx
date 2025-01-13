import React from "react";
import styled from "styled-components";
import UserPageHeader from "../components/General/UserPageHeader";
import SideBarMenu from "../components/General/SideBarMenu";
import ProductCard from "../components/UserMinimart/ProductCard";
import FilterTags from "../components/UserMinimart/FilterTags";
import SearchBar from "../components/UserMinimart/SearchBar";
import MockProducts from "../mockDatabase/MockProducts";

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

const VoucherButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
  flex: 1;
`;

const UserMinimart: React.FC = () => {
  return (
    <MinimartContainer>
      <UserPageHeader />
      <MinimartBody>
        <SearchAndFilters>
          <SearchBar />
          <VoucherButton>
            <span style={{ marginRight: "8px" }}>💳</span>
            Voucher amount
          </VoucherButton>
        </SearchAndFilters>
        <FilterTags />
        <ProductGrid>
          {MockProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </ProductGrid>
      </MinimartBody>
      <SideBarMenu />
    </MinimartContainer>
  );
};

export default UserMinimart;
