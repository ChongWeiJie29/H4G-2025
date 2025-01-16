import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { UseFilters, UseGuards } from "@nestjs/common";
import { HttpExceptionFilter } from "src/common/http-exception.filter";
import { Voucher } from "./voucher.entity";
import { Output } from "src/common/InputOutput";
import { VoucherService } from "./voucher.service";
import { CreateVoucherInput, GetAllVouchersOutput, UpdateVoucherStatusInput } from "./voucherIO";
import { AuthGuard } from "src/common/auth.guard";

@Resolver(() => Voucher)
export class VoucherResolver {
  constructor(
    private readonly voucherService: VoucherService
  ) {}

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async createVoucher(@Args('voucher') voucher: CreateVoucherInput, @Context() context: any) {
    try {
      return this.voucherService.createVoucher(voucher, context.req.name);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async deleteVoucher(@Args('voucher_id') voucher_id: number) {
    try {
      return this.voucherService.deleteVoucher(voucher_id);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Query(() => GetAllVouchersOutput)
  async getAllVouchers() {
    try {
      return this.voucherService.getAllVouchers();
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async updateVoucherStatus(@Args('details') details: UpdateVoucherStatusInput) {
    try {
      return this.voucherService.updateVoucherStatus(details);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Query(() => GetAllVouchersOutput)
  async getUserVouchers(@Context() context: any) {
    try {
      return this.voucherService.getUserVouchers(context.req.name);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Query(() => GetAllVouchersOutput)
  async getAllPendingVouchers(@Context() context: any) {
    try {
      return this.voucherService.getAllPendingVouchers(context.req.name);
    } catch (err) {
      throw err;
    }
  }
}
