import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        JwtModule,
    ],
    exports: [TypeOrmModule],
    providers: [ProductResolver, ProductService],
})
export class ProductModule {}
