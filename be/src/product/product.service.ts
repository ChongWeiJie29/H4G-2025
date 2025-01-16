import { Injectable } from "@nestjs/common";
import { Product } from "./product.entity";
import { DataSource } from "typeorm";
import { ProductUpdateDetailsInput } from "./productIO";
import { handleServiceError } from "src/common/servicesError";

@Injectable()
export class ProductService {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async createProduct(product: Product) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productExists = await queryRunner.manager.existsBy(Product, { name: product.name });
      if (productExists) {
        await queryRunner.manager.increment(Product, { name: product.name }, 'quantity', product.quantity );
        await queryRunner.manager.update(Product, { name: product.name }, { price: product.price });
      } else {
        await queryRunner.manager.insert(Product, product);
      }
      await queryRunner.commitTransaction();
      return { message: 'Product listing created / updated :>' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteProduct(name: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(Product, { name: name });
      await queryRunner.commitTransaction();
      return { message: 'Product listing removed :>' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllAvailableProducts() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const [products, productsCount] = await queryRunner.manager.findAndCount(Product, {});
      return {
        message: 'Product listings retrieved :>',
        products: products,
        productsCount: productsCount,
      }
    } catch (err) {
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async updateProductDetails({ name, colName, value }: ProductUpdateDetailsInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let inputValue;
      if (colName !== 'name') {
        inputValue = Number(value);
      } else {
        inputValue = value;
      }
      await queryRunner.manager.update(Product, { name: name }, { [colName]: inputValue });
      await queryRunner.commitTransaction();
      return { message: 'Product listing updated :>' }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async updateCount({name, value}: ProductUpdateDetailsInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const inputValue = Number(value);
      if (inputValue > 0) {
        await queryRunner.manager.increment(Product, { name: name }, 'quantity', value);
      } else if (inputValue < 0) {
        await queryRunner.manager.decrement(Product, { name: name }, 'quantity', value);
      }
      await queryRunner.commitTransaction();
      return { message: 'Product listing updated :>' }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }
}
