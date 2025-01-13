import styled from "styled-components";
import { Product } from "../../definitions/Product";

const CardContainer = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CategoryTag = styled.div`
  background: #8ebdb6;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  margin: 8px 0;
  align-self: flex-start;
`;

const ProductDescription = styled.div`
  font-size: 14px;
  color: #555;
  flex: 1;
  margin: 8px 0;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #888;
`;

const QuantityLeft = styled.div`
  font-size: 12px;
  color: #888;
`;

const UnitCost = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <CardContainer>
      <ProductImage src={product.image} alt={product.name} />
      <ProductDetails>
        <CategoryTag>{product.category}</CategoryTag>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductFooter>
          <QuantityLeft>Qty: {product.quantityAvailable}</QuantityLeft>
          <UnitCost>{product.unitCost} 💳</UnitCost>
        </ProductFooter>
      </ProductDetails>
    </CardContainer>
  );
};

export default ProductCard;

