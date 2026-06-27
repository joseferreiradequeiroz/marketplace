import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProxyModule } from './proxy/proxy.module';
import { AppController } from './app.controller';

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
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
