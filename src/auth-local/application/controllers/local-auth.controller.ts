import { Controller, UseGuards } from "@nestjs/common";
import { Body, Post, Request } from "@nestjs/common/decorators/http";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiTags,
} from "@nestjs/swagger";
import { DtoLoginRequest } from "src/auth-local/application/dtos/dto-login.request";
import { DtoRegistrationRequest } from "src/auth-local/application/dtos/dto-registration.request";
import { DtoRegistrationResponse } from "src/auth-local/application/dtos/dto-registration.response";
import { LoginService } from "src/auth-local/core/services/login.service";
import { RegistrationService } from "src/auth-local/core/services/registration.service";
import { LocalAuthGuard } from "src/auth-local/infrastructure/passport/local.guard";
import { DtoLoginResponse } from "src/auth/application/dtos/dto-login.response";

@ApiTags("Auth")
@Controller({ path: "auth", version: "1" })
export class LocalAuthController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly loginService: LoginService,
  ) {}

  @ApiExtraModels(DtoLoginRequest)
  @ApiBody({ type: DtoLoginRequest })
  @ApiCreatedResponse({ type: DtoLoginResponse })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(
    @Body() _: DtoLoginRequest,
    @Request() req: Request,
  ): Promise<DtoLoginResponse> {
    return await this.loginService.login(req.user);
  }

  @ApiExtraModels(DtoRegistrationRequest)
  @ApiBody({ type: DtoRegistrationRequest })
  @ApiCreatedResponse({ type: DtoRegistrationResponse })
  @ApiConflictResponse({ description: "User with this email already exists" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @Post("/register")
  async register(@Body() body: DtoRegistrationRequest): Promise<unknown> {
    return await this.registrationService.registerUser(body);
  }
}
