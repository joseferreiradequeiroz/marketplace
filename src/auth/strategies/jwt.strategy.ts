import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport/dist/passport/passport.strategy";
import { AuthService } from "../service/auth.service";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
       constructor(private readonly authService: AuthService) {
              super({
                     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                     ignoreExpiration: false,
                     secretOrKey: process.env.JWT_SECRET
              });
       }
       async validate(payload: any) {
              if(!payload || !payload.token){
                     throw new UnauthorizedException();
              }
              
              const user = await this.authService.validateJwtToken(payload.token);  
              if(!user){
                     throw new UnauthorizedException();
              }
              return {userId: user.id, email: user.email, roles: user.roles};
       }
}