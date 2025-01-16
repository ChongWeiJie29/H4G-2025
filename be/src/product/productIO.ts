import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Output, UpdateDetailsInput } from "src/common/InputOutput";
import { Product } from "./product.entity";

@InputType()
export class ProductUpdateDetailsInput extends UpdateDetailsInput {
  @Field()
  name: string;
}

@ObjectType()
export class GetAllAvailableProductsOutput extends Output {
  @Field(() => Int)
  productsCount: number;

  @Field(() => [Product!]!)
  products: Product[];
}
