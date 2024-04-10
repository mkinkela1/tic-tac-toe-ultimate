import { User } from "src/user/core/entities/user.entity";

declare module "@nestjs/common" {
  export interface Request {
    user?: User;
  }
}
