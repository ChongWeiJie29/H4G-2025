import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Output } from "src/common/InputOutput";
import { ProductLog } from "./product-log.entity";

@ObjectType()
export class GetProductLogsOutput extends Output {
  @Field(type => [ProductLog!]!)
  productLogs: ProductLog[];

  @Field(type => Int)
  productLogsCount: number;
}