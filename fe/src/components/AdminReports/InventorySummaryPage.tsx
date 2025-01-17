import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import TotalStats from "./InventoryComponents/TotalStats";
import TagPieChart from "./InventoryComponents/TagPieChart";
import TopProducts from "./InventoryComponents/TopProducts";
import InventoryLogs from "./InventoryComponents/InventoryLogs";
import PriceHistogram from "./InventoryComponents/PriceHistogram";
import { GET_ALL_PRODUCTS, GET_ALL_REQUESTS, GET_PRODUCT_LOGS } from "../../gql/ops";
import LoadingScreen from "../General/LoadingScreen";

const PageContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
`;

const Charts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const ChartContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const InventorySummaryPage: React.FC = () => {
  const { data: productsData, loading: loadingProducts, error: errorProducts } = useQuery(GET_ALL_PRODUCTS);
  const { data: requestsData, loading: loadingRequests, error: errorRequests } = useQuery(GET_ALL_REQUESTS);
  const { data: logsData, loading: loadingLogs, error: errorLogs } = useQuery(GET_PRODUCT_LOGS);

  if (loadingProducts || loadingRequests || loadingLogs) return <LoadingScreen />
  if (errorProducts || errorRequests || errorLogs) return <p>Error loading data: {errorProducts?.message || errorRequests?.message}</p>;

  // Prepare data for TotalStats
  const totalProducts = productsData?.getAllAvailableProducts?.productsCount || 0;
  const totalQuantity = productsData?.getAllAvailableProducts?.products.reduce((acc: number, product: any) => acc + product.quantity, 0) || 0;

  // Prepare data for TagPieChart
  const tagData = productsData?.getAllAvailableProducts?.products.reduce((tags: any, product: any) => {
    const existingTag = tags.find((tag: any) => tag.tag === product.tag);
    if (existingTag) {
      existingTag.count += 1;
    } else {
      tags.push({ tag: product.tag, count: 1 });
    }
    return tags;
  }, []);

  // Prepare data for TopProducts
  const productSales = requestsData?.getAllRequests?.requests.reduce((sales: any, request: any) => {
    if (!sales[request.product]) {
      sales[request.product] = 0;
    }
    sales[request.product] += request.quantity;
    return sales;
  }, {});

  const topProducts = Object.entries(productSales || {})
    .map(([name, count]: [string, number]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  // Prepare data for PriceHistogram
  const priceData = productsData?.getAllAvailableProducts?.products.map((product: any) => product.price);

  const logs = logsData?.getAllLogs?.productLogs || [];

  return (
    <PageContainer>
      <h2>Inventory Insights</h2>
      <TotalStats
        totalProducts={totalProducts}
        totalTags={tagData?.length || 0}
        totalQuantity={totalQuantity}
      />
      <ChartContainer>
        <h3>Inventory Distribution</h3>
        <Charts>
          <TagPieChart tagData={tagData} />
          <PriceHistogram priceData={priceData} />
        </Charts>
      </ChartContainer>
      <TopProducts products={topProducts} />
      <InventoryLogs logs={logs}/>
    </PageContainer>
  );
};

export default InventorySummaryPage;

