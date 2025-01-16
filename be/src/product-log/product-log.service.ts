import { Injectable } from '@nestjs/common';
import { handleServiceError } from 'src/common/servicesError';
import { DataSource } from 'typeorm';
import { ProductLog } from './product-log.entity';

@Injectable()
export class ProductLogService {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async getAllLogs() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const [productLogs, productLogsCount] = await queryRunner.manager.findAndCount(ProductLog);
      return { 
        message: "Product logs retrieved :>", 
        productLogs: productLogs,
        productLogsCount: productLogsCount, 
      };
    } catch (err) {
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }
}
