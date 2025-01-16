import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { RequestResolver } from './request.resolver';
import { RequestService } from './request.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Request]),
        JwtModule,
    ],
    exports: [TypeOrmModule],
    providers: [RequestResolver, RequestService],
})
export class RequestModule {}
