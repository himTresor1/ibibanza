import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { BuyerPreferenceSchema } from "@ibibanza/shared";
import { ZodValidationPipe } from "../../common/validation/zod-validation.pipe";
import { BuyersService } from "./buyers.service";

@Controller("buyers")
export class BuyersController {
  constructor(private readonly buyers: BuyersService) {}

  @Post("alert-opt-in")
  @UsePipes(new ZodValidationPipe(BuyerPreferenceSchema))
  optIn(@Body() body: Parameters<BuyersService["optIn"]>[0]) {
    return this.buyers.optIn(body);
  }
}
