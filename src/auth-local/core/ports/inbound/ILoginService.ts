import { User } from "src/user/core/entities/user.entity";

export interface ILoginService {
  login(user: User): Promise<{ accessToken: string; refreshToken: string }>;
}
