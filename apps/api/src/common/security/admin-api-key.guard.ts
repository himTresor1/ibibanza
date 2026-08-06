import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";

@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const expected = process.env.ADMIN_API_KEY;
    const received = request.header("x-admin-api-key");

    if (!expected || received !== expected) {
      throw new UnauthorizedException({ code: "ADMIN_AUTH_REQUIRED", message: "Admin key irakenewe." });
    }

    return true;
  }
}
