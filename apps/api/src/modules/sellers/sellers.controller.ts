import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { SellerSubmissionSchema } from "@ibibanza/shared";
import { ZodValidationPipe } from "../../common/validation/zod-validation.pipe";
import { SellersService } from "./sellers.service";

@Controller("seller-submissions")
export class SellersController {
  constructor(private readonly sellers: SellersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(SellerSubmissionSchema))
  submit(@Body() body: Parameters<SellersService["submit"]>[0]) {
    return this.sellers.submit(body);
  }
}
