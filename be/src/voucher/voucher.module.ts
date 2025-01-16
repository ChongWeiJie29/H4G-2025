import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './voucher.entity';
import { VoucherResolver } from './voucher.resolver';
import { VoucherService } from './voucher.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voucher]),
    JwtModule,
  ],
  exports: [TypeOrmModule],
  providers: [VoucherResolver, VoucherService],
})
export class VoucherModule {}
