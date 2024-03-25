import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Get } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller({ path: "health", version: "1" })
@ApiTags("Health")
export class HealthController {
  @Get()
  healthCheck() {
    return "Ok!";
  }
}
