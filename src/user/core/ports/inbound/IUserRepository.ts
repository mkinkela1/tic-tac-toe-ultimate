import { User } from "src/user/core/entities/user.entity";

export interface IUserRepository {
  createUser(user: Partial<User>): Promise<User>;
  expectOneByEmail(email: string): Promise<User>;
}
