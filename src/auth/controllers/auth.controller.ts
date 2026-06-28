import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
       constructor(
              private readonly authService: AuthService              
       ){}
       @Post('login')
       @HttpCode(200)
       @ApiOperation({ summary: 'Login user' })
       @ApiResponse({ status: 200, description: 'User logged in successfully' })
       @ApiResponse({ status: 401, description: 'Invalid credentials' })
       async login(@Body() loginDTO: {email: string, password: string}){
              return this.authService.login(loginDTO);
       }

       @Post('register')
       @HttpCode(201)
       @ApiOperation({ summary: 'Register user' })
       @ApiResponse({ status: 201, description: 'User registered successfully' })
       @ApiResponse({ status: 400, description: 'Invalid registration data' })
       async register(@Body() registerDTO: {email: string, password: string, name: string}){
              return this.authService.register(registerDTO);
       }

}
