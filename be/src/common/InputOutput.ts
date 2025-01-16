import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Output {
  @Field()
  message: string;
}

@InputType()
export class UpdateDetailsInput {
  @Field()
  colName: string

  @Field()
  value: string
}