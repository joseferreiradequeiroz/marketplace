import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggingMiddleware } from './logging/logging.middleware';

@Module({
       imports: [
              ThrottlerModule.forRoot({
                    throttlers: [
                     {
                     limit: 10,
                     ttl: 60000
              }
                    ]
              })
       ],
       exports: [],
       providers: [LoggingMiddleware]
})
export class MiddlewareModule {}
