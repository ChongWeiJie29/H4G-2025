import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UseFilters, UseGuards } from "@nestjs/common";
import { HttpExceptionFilter } from "src/common/http-exception.filter";
import { AuthenticateUserInput, AuthenticateUserOutput, GetAllUsersOutput, UserUpdateDetailsInput } from "./userIO";
import { AuthGuard } from "src/common/auth.guard";
import { Output } from "src/common/InputOutput";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @UseFilters(HttpExceptionFilter)
  @Query(() => AuthenticateUserOutput)
  async authenticateUser(@Args('user') user: AuthenticateUserInput) {
    try {
      return this.userService.authenticateUser(user);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Query(() => User)
  async getUser(@Context() context: any) {
    try {
      return this.userService.getUser(context.req.name);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Query(() => GetAllUsersOutput)
  async getAllUsers() {
    try {
      return this.userService.getAllUsers();
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async createUser(@Args('user') user: User) {
    try {
      return this.userService.createUser(user);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async deleteUser(@Args('user') user: string) {
    try {
      return this.userService.deleteUser(user);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async updateUserDetails(@Args('details') details: UserUpdateDetailsInput) {
    try {
      return this.userService.updateDetails(details);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Mutation(() => Output)
  async updateUserVoucher(@Args('details') details: UserUpdateDetailsInput) {
    try {
      return this.userService.updateUserVoucher(details);
    } catch (err) {
      throw err;
    }
  }
}