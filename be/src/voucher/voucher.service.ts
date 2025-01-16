import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Voucher, VoucherType } from "./voucher.entity";
import { CreateVoucherInput, UpdateVoucherStatusInput } from "./voucherIO";
import { handleServiceError } from "src/common/servicesError";

@Injectable()
export class VoucherService {
  constructor(
    private readonly dataSource: DataSource
  ) {}

  async createVoucher(voucher: CreateVoucherInput, name: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const voucherToInsert = { name: name, amount: voucher.amount, task: voucher.task };
      await queryRunner.manager.insert(Voucher, voucherToInsert);
      await queryRunner.commitTransaction();
      return { message: "Voucher created :>" };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteVoucher(voucher_id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const voucher = await queryRunner.manager.findOneBy(Voucher, { voucher_id: voucher_id });
      if (voucher.status !== VoucherType.pending) {
        throw new HttpException('Cannot delete already processed voucher :/', HttpStatus.FORBIDDEN);
      }
      await queryRunner.manager.delete(Voucher, { voucher_id: voucher_id });
      await queryRunner.commitTransaction();
      return { message: "Voucher request deleted :>" };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllVouchers() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const [vouchers, voucherCount] = await queryRunner.manager.findAndCount(Voucher, {});
      return {
        message: "Vouchers retrieved :>",
        vouchers: vouchers,
        vouchersCount: voucherCount,
      };
    } catch (err) {
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async updateVoucherStatus({ voucher_id, status }: UpdateVoucherStatusInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(Voucher, { voucher_id: voucher_id }, { status: status, response_time: new Date() });
      await queryRunner.commitTransaction();
      return { message: "Voucher status updated :>" };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async getUserVouchers(name: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const [vouchers, vouchersCount] = await queryRunner.manager.findAndCountBy(Voucher, { name: name });
      return { 
        message: "User vouchers retrieved :>",
        vouchers: vouchers,
        vouchersCount: vouchersCount,
      };
    } catch (err) {
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllPendingVouchers(name: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const [vouchers, vouchersCount] = await queryRunner.manager.findAndCountBy(Voucher, { status: VoucherType.pending });
      return { 
        message: "Pending vouchers retrieved :>",
        vouchers: vouchers,
        vouchersCount: vouchersCount,
      };
    } catch (err) {
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }
}
