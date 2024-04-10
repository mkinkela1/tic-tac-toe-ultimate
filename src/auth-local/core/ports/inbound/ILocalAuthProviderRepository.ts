import { LocalAuthProvider } from "src/auth-local/core/entities/local-auth-provider.entity";
import { User } from "src/user/core/entities/user.entity";

export interface ILocalAuthProiderRepository {
  expectOneByEmail(email: string): Promise<LocalAuthProvider>;
  registerUser(user: User, hashedPassword: string): Promise<LocalAuthProvider>;
}
