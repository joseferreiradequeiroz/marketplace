import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true
     }), 
     ThrottlerModule.forRoot({
        throttlers: [
          {
            ttl: 60000,
            limit: 10
          }
        ]
     }), ProxyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
