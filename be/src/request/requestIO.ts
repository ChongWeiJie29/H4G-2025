import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Request, RequestType } from "./request.entity";
import { Output } from "src/common/InputOutput";
import { Product } from "src/product/product.entity";

@InputType()
export class RequestUpdateStatusInput {
  @Field(type => Int)
  request_id: number;

  @Field(type => RequestType)
  status: RequestType;
}

@ObjectType()
export class GetAllRequestsOutput extends Output {
  @Field(type => [Request!]!)
  requests: Request[];

  @Field(type => Int)
  requestsCount: number;
}

@InputType()
export class ShoppingCartItem {
  @Field(type => Product)
  product: Product;

  @Field(type => Int)
  quantity: number;
}
