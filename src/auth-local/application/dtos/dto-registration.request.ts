import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class DtoRegistrationRequest {
  @ApiProperty()
  @IsEmail({}, { message: "Invalid email" })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: "Password is too short." })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password is too weak.",
  })
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
