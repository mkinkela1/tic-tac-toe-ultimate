import { ApiResponseProperty } from "@nestjs/swagger";

export class DtoRegistrationResponse {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  password: string;

  @ApiResponseProperty()
  firstName: string;

  @ApiResponseProperty()
  lastName: string;
}
