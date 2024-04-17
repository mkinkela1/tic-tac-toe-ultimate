import { User } from "src/user/core/entities/user.entity";

export class DtoLoginResponse {
  accessToken: string;
  user: User;
}
