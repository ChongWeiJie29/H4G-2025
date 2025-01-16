import { Injectable } from "@nestjs/common";
import { Request, RequestType } from "./request.entity";
import { DataSource, In } from "typeorm";
import { handleServiceError } from "src/common/servicesError";
import { RequestUpdateStatusInput, ShoppingCartItem } from "./requestIO";
import { User } from "src/user/user.entity";

@Injectable()
export class RequestService {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async addRequests(shoppingCart: ShoppingCartItem[], name: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let request;
      let totalDamageToWallet = 0
      shoppingCart.forEach(async (value) => {
        request = { name: name, product: value.product.name, quantity: value.quantity, price: value.product.price };
        totalDamageToWallet += request.quantity * request.price;
        await queryRunner.manager.insert(Request, request);
      });
      await queryRunner.manager.decrement(User, { name: name }, 'voucher', totalDamageToWallet);
      await queryRunner.commitTransaction();
      return { message: "Requests created :>" };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteRequest(request_id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(Request, { request_id: request_id });
      await queryRunner.commitTransaction();
      return { message: "Request deleted :>" };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllPendingRequests() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const [requests, requestsCount] = await queryRunner.manager.findAndCountBy(Request, { status: RequestType.pending });
      return { 
        message: "Pending requests retrieved :>",
        requests: requests,
        requestsCount: requestsCount,
      };
    } catch (err) {
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async updateRequestStatus({ request_id, status }: RequestUpdateStatusInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(Request, { request_id: request_id }, { status: status, response_time: new Date() });
      await queryRunner.commitTransaction();
      return { message: "Request status updated :>" };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async getUserRequests(name: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const [requests, requestsCount] = await queryRunner.manager.findAndCountBy(Request, { name: name });
      return { 
        message: "User requests retrieved :>",
        requests: requests,
        requestsCount: requestsCount,
      };
    } catch (err) {
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllRequests() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const [requests, requestsCount] = await queryRunner.manager.findAndCount(Request);
      return { 
        message: "All requests retrieved :>",
        requests: requests,
        requestsCount: requestsCount,
      };
    } catch (err) {
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }
}