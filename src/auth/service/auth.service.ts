import { HttpService } from '@nestjs/axios/dist/http.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { serviceConfig } from 'src/config/gateway.config';

export interface UserSession {
       valid: boolean;
       user: {
              id: string;
              email: string;
              firstName: string;
              lastName: string;
              roles: string;
              status: string;
       } | null;
}

@Injectable()
export class AuthService {
       constructor(
              private readonly jetService: JwtService,
              private readonly httpService: HttpService
       ){}
       
       validateJwtToken(token: string): Promise<any>{
              try{
                     return this.jetService.verify(token)
              }catch(err){
                     throw new UnauthorizedException('Invalid token');
              }
       }
       async validateSessionToken(sessionToken: string):Promise<UserSession>{
              try{
                     const { data } = await firstValueFrom(
                            this.httpService.get<UserSession>(`${serviceConfig.users.url}/sessions/validate/${sessionToken}`,{
                                   timeout: serviceConfig.users.timeout
                            })
                     )
                     return data;
              }catch(err){
                     throw new UnauthorizedException('Invalid session token');
              }
       }
       async login(loginDTO: {email: string, password: string}){
              try{
                     const {data} = await firstValueFrom(
                            this.httpService.post(`${serviceConfig.users.url}/login`, loginDTO,{
                                   timeout: serviceConfig.users.timeout
                            })
                     )
                     return data;
              }catch(err){
                     throw new UnauthorizedException('Invalid credentials');
              }
       }
       async register(registerDTO: any){
               try{
                     const {data} = await firstValueFrom(
                            this.httpService.post(`${serviceConfig.users.url}/auth/register`, registerDTO,{
                                   timeout: serviceConfig.users.timeout
                            })
                     )
                     return data;
              }catch(err){
                     throw new UnauthorizedException('Registration failed');
              }
       }
}
