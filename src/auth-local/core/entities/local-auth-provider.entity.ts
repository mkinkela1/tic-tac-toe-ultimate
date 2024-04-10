import { Provider } from "src/auth/core/entities/auth-provider.entity";
import { User } from "src/user/core/entities/user.entity";

export class LocalAuthProvider {
  userId: string;
  user: User;
  provider: Provider.EMAIL_PASSWORD;
  password?: string;
}
