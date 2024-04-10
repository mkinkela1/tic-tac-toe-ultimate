import { LocalAuthProvider } from "src/auth-local/core/entities/local-auth-provider.entity";

export type RegistrationData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export interface IRegistrationService {
  registerUser(data: RegistrationData): Promise<LocalAuthProvider>;
}
