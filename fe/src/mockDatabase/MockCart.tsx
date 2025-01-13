import { CartItem } from "../definitions/CartItem";
import MockProducts from "./MockProducts";

const MockCart: CartItem[] = [
  { product: MockProducts[0], quantity: 2 },
  { product: MockProducts[1], quantity: 1 },
  { product: MockProducts[4], quantity: 7 },
  { product: MockProducts[5], quantity: 4 },
];

export default MockCart;

