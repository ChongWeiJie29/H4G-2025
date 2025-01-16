import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLogResolver } from './product-log.resolver';
import { ProductLogService } from './product-log.service';
import { JwtModule } from '@nestjs/jwt';
import { ProductLog } from './product-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductLog]),
    JwtModule,
  ],
  exports: [TypeOrmModule],
  providers: [ProductLogResolver, ProductLogService],
})
export class ProductLogModule {}
