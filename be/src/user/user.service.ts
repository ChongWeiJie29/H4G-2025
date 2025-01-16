import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User, UserType } from "./user.entity";
import { compare, hash } from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthenticateUserInput, UserUpdateDetailsInput } from "./userIO";
import { handleServiceError } from "src/common/servicesError";

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async authenticateUser(user: AuthenticateUserInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const userInDb = await queryRunner.manager.findOneBy(User, {
        name: user.name,
      });
      if (!userInDb || !(await compare(user.password, userInDb.password))) {
        throw new HttpException('Incorrect username / password :/', HttpStatus.UNAUTHORIZED);
      }
      const payload = { name: user.name, role: userInDb.status, isactive: userInDb.isactive };
      return {
        message: 'User login successful :>',
        token: await this.jwtService.signAsync(payload),
      };
    } catch (err) {
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async getUser(name: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const user = await queryRunner.manager.findOneBy(User, { name: name });
      return user;
    } catch (err) {
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllUsers() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const [users, usersCount] = await queryRunner.manager.findAndCountBy(User, {});
      return {
        message: 'Users retrieved :>',
        users: users,
        usersCount: usersCount,
      }
    } catch (err) {
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async createUser(user: User) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      user.password = await hash(
        user.password,
        Number(this.configService.get<number>('BCRYPT_SALT_ROUNDS'))
      );
      await queryRunner.manager.insert(User, user);
      await queryRunner.commitTransaction();
      return { message: 'User created :>' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteUser(name: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(User, { name: name });
      await queryRunner.commitTransaction();
      return { message: 'User removed :>' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async updateDetails({ name, colName, value }: UserUpdateDetailsInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let inputValue;
      if (colName === 'status') {
        inputValue = value as UserType;
      } else if (colName === 'isactive') {
        inputValue = value === 'true';
      } else if (colName === 'voucher') {
        inputValue = Number(value);
      } else {
        inputValue = value;
      }
      await queryRunner.manager.update(User, { name: name }, { [colName]: inputValue });
      await queryRunner.commitTransaction();
      return { message: 'User Details updated :>' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }

  async updateUserVoucher({name, value}: UserUpdateDetailsInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const inputValue = Number(value);
      if (inputValue > 0) {
        await queryRunner.manager.increment(User, { name: name }, 'voucher', value);
      } else if (inputValue < 0) {
        await queryRunner.manager.decrement(User, { name: name }, 'voucher', value);
      }
      await queryRunner.commitTransaction();
      return { message: 'User vouchers updated :>' }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handleServiceError(err);
    } finally {
      await queryRunner.release();
    }
  }
}
