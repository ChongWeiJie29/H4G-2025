import { Output } from "src/common/InputOutput";
import { Product } from "./product.entity";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { UseFilters, UseGuards } from "@nestjs/common";
import { HttpExceptionFilter } from "src/common/http-exception.filter";
import { GetAllAvailableProductsOutput, ProductUpdateDetailsInput } from "./productIO";
import { AuthGuard } from "src/common/auth.guard";

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async createProduct(@Args('product') product: Product) {
    try {
      return this.productService.createProduct(product);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async deleteProduct(@Args('name') name: string) {
    try {
      return this.productService.deleteProduct(name);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Query(() => GetAllAvailableProductsOutput)
  async getAllAvailableProducts() {
    try {
      return this.productService.getAllAvailableProducts();
    } catch (err) {
      throw err;
    }
  }
  
  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async updateProductDetails(@Args('details') details: ProductUpdateDetailsInput) {
    try {
      return this.productService.updateProductDetails(details);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async updateCount(@Args('details') details: ProductUpdateDetailsInput) {
    try {
      return this.productService.updateCount(details);
    } catch (err) {
      throw err;
    }
  }

}
