import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Output } from "src/common/InputOutput";
import { Voucher, VoucherType } from "./voucher.entity";

@ObjectType()
export class GetAllVouchersOutput extends Output {
  @Field(() => [Voucher!]!)
  vouchers: Voucher[];

  @Field(() => Int)
  vouchersCount: number;
}

@InputType()
export class UpdateVoucherStatusInput {
  @Field(() => Int)
  voucher_id: number;

  @Field(() => VoucherType)
  status: VoucherType;
}

@InputType()
export class CreateVoucherInput {
  @Field(() => Int)
  amount: number;

  @Field()
  task: string;
}
