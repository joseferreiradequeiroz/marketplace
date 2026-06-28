import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controllers/auth.controller';


@Module({
       imports: [
          PassportModule,
          HttpModule,
          JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService) => ({
               secret: configService.get('JWT_SECRET'),
               signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
            }),
            inject: [ConfigModule],
          })
       ],
       exports: [],
       providers: [AuthService],
       controllers: [AuthController]
})
export class AuthModule {}
