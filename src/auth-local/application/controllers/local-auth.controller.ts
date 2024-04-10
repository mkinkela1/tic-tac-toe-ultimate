import { Controller } from "@nestjs/common";
import { Body, Post } from "@nestjs/common/decorators/http";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiTags,
} from "@nestjs/swagger";
import { DtoRegistrationRequest } from "src/auth-local/application/dtos/dto-registration.request";
import { DtoRegistrationResponse } from "src/auth-local/application/dtos/dto-registration.response";
import { RegistrationService } from "src/auth-local/core/services/registration.service";

@ApiTags("Auth")
@Controller({ path: "auth", version: "1" })
export class LocalAuthController {
  constructor(
    private readonly registrationService: RegistrationService,
    // private readonly loginService: ILoginService,
  ) {}

  // @ApiExtraModels(DtoLoginRequest)
  // @ApiBody({ type: DtoLoginRequest })
  // @ApiCreatedResponse({ type: DtoLoginResponse })
  // @ApiNotFoundResponse({ description: "User not found" })
  // @ApiBadRequestResponse({ description: "Bad Request" })
  // //   @UseGuards(LocalAuthGuard)
  // @Post("/login")
  // async login(
  //   @Body() _: DtoLoginRequest,
  //   @Request() req: Request,
  // ): Promise<DtoLoginResponse> {
  //   return await this.loginService.login(req.user);
  // }

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
