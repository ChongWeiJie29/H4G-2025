import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request } from "./request.entity";
import { RequestService } from "./request.service";
import { UseFilters, UseGuards } from "@nestjs/common";
import { HttpExceptionFilter } from "src/common/http-exception.filter";
import { Output } from "src/common/InputOutput";
import { GetAllRequestsOutput, RequestUpdateStatusInput, ShoppingCartItem } from "./requestIO";
import { AuthGuard } from "src/common/auth.guard";

@Resolver(() => Request)
export class RequestResolver {
  constructor(
    private readonly requestService: RequestService,
  ) {}

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async confirmShoppingCart(
    @Args(
      'shoppingCart', { type: () => [ShoppingCartItem!]! }
    ) shoppingCart: ShoppingCartItem[], 
    @Context() context: any) {
    try {
      return this.requestService.addRequests(shoppingCart, context.req.name);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async deleteRequest(@Args('request_id') request_id: number) {
    try {
      return this.requestService.deleteRequest(request_id);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Query(() => GetAllRequestsOutput)
  async getAllPendingRequests() {
    try {
      return this.requestService.getAllPendingRequests();
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async updateRequestStatus(@Args('details') details: RequestUpdateStatusInput) {
    try {
      return this.requestService.updateRequestStatus(details);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Query(() => GetAllRequestsOutput)
  async getUserRequests(@Context() context: any) {
    try {
      return this.requestService.getUserRequests(context.req.name);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Query(() => GetAllRequestsOutput)
  async getAllRequests() {
    try {
      return this.requestService.getAllRequests();
    } catch (err) {
      throw err;
    }
  }
}