import { Resolver, Query } from '@nestjs/graphql';
import { ProductLogService } from './product-log.service';
import { ProductLog } from './product-log.entity';
import { GetProductLogsOutput } from './product-logIO';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/auth.guard';

@Resolver(() => ProductLog)
export class ProductLogResolver {
  constructor(private readonly productLogService: ProductLogService) {}

  @UseGuards(AuthGuard)
  @Query(() => GetProductLogsOutput)
  async getAllLogs() {
    return this.productLogService.getAllLogs();
  }
}
