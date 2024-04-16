import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginService } from "src/auth-local/core/services/login.service";
import { User } from "src/user/core/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private loginService: LoginService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.loginService.validateUserForLocalStrategy(
      email,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
