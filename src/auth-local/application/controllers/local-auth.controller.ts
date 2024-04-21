import { Controller, UseGuards } from "@nestjs/common";
import { Body, Post, Request, Res } from "@nestjs/common/decorators/http";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import { DtoLoginRequest } from "src/auth-local/application/dtos/dto-login.request";
import { DtoRegistrationRequest } from "src/auth-local/application/dtos/dto-registration.request";
import { DtoRegistrationResponse } from "src/auth-local/application/dtos/dto-registration.response";
import { REFRESH_TOKEN_COOKIE_NAME } from "src/auth-local/core/constants/constants";
import { LoginService } from "src/auth-local/core/services/login.service";
import { RegistrationService } from "src/auth-local/core/services/registration.service";
import { LocalAuthGuard } from "src/auth-local/infrastructure/passport/local.guard";
import { DtoLoginResponse } from "src/auth/application/dtos/dto-login.response";
import { configService } from "src/main/infrastructure/persistance/postgres/service/config.service";

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
    @Res() res: Response,
  ): Promise<DtoLoginResponse> {
    const { user, accessToken, refreshToken } = await this.loginService.login(
      req.user,
    );

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: configService.isProduction(),
    });

    return res.json({ user, accessToken }) as unknown as DtoLoginResponse;
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
