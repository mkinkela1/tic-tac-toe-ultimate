import { User } from "src/user/core/entities/user.entity";

export enum Provider {
  EMAIL_PASSWORD = "email_password",
  GOOGLE = "google",
}

export class AuthProvider {
  userId: string;
  user: User;
  provider: Provider;
  socialId?: string;
  password?: string;
}
