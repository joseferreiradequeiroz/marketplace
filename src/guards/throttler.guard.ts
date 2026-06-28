import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected someMethod(req: Record<string, any>): string {
    return `${req.ip}-${req.headers['user-agent']}`;
  }
}
