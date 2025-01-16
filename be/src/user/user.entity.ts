import { Field, InputType, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

export enum UserType {
  resident = 'resident',
  admin = 'admin',
}

registerEnumType(UserType, {
  name: 'UserType',
});

@InputType('UserInput')
@ObjectType('UserObject')
@Entity('users')
export class User {
  @Field()
  @PrimaryColumn()
  name: string;

  @Field()
  @Column()
  password: string;

  @Field(type => UserType, { nullable: true })
  @Column({ type: 'enum', enum: UserType, default: UserType.resident })
  status: UserType;

  @Field({ nullable: true })
  @Column({ default: true })
  isactive: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field(type => Int, { nullable: true })
  @Column({ type: 'integer', default: 0 })
  voucher: number;
}