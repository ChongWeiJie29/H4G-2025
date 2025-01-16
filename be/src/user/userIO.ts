import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Output, UpdateDetailsInput } from "src/common/InputOutput";
import { User } from "./user.entity";

@InputType()
export class AuthenticateUserInput {
  @Field()
  name: string;

  @Field()
  password: string;
}

@ObjectType()
export class AuthenticateUserOutput extends Output {
  @Field()
  token: string;
}

@InputType()
export class UserUpdateDetailsInput extends UpdateDetailsInput {
  @Field()
  name: string;
}

@ObjectType()
export class GetAllUsersOutput extends Output {
  @Field(type => [User!]!)
  users: User[]

  @Field(type => Int)
  usersCount: number
}
