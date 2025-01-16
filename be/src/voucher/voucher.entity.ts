import { Field, GraphQLISODateTime, InputType, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum VoucherType {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

registerEnumType(VoucherType, {
  name: 'VoucherType',
});

@InputType('VoucherInput')
@ObjectType('VoucherObject')
@Entity('vouchers')
export class Voucher {
  @Field(type => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  voucher_id: number

  @Field()
  @Column()
  name: string;
  
  @Field(type => Int)
  @Column({ type: 'integer' })
  amount: number;

  @Field()
  @Column()
  task: string;
  
  @Field(type => VoucherType, { nullable: true })
  @Column({ type: 'enum', enum: VoucherType, default: VoucherType.pending })
  status: VoucherType;

  @Field(type => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  request_time: Date;

  @Field(type => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  response_time: Date;
}