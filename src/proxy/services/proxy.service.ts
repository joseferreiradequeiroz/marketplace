import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { serviceConfig } from 'src/config/gateway.config';

@Injectable()
export class ProxyService {
       private readonly logger = new Logger(ProxyService.name);

       constructor(private readonly httpService: HttpService){}

       async proxyRequest(
         serviceName: keyof typeof serviceConfig,
         method: string,
         path: string,
         data?: any,
         headers?: any,
         userInfo?: any
       ){
              const service = serviceConfig[serviceName];
              const url = `${service.url}${path}`;

              this.logger.log(`Proxying request to ${url} with method ${method} in service ${serviceName}`);

              try{
                     const enhancedHeaders = {
                            ...headers,
                            'x-User-Id': userInfo?.id,
                            'x-User-Email': userInfo?.email,
                            'x-User-Role': userInfo?.role,   
                     }

                     const response = await firstValueFrom(
                           this.httpService.request({
                            method: method.toLowerCase() as any,
                            url,
                            data,
                            headers: enhancedHeaders,
                            timeout: service.timeout,
                           }) 
                     );
                     return response.data;
              } catch(error: any){
                     this.logger.error(`Error proxying request to ${url} with method ${method} in service ${serviceName}: ${error.message}`);
                     throw error;
              }
       }
       async getServiceHealth(serviceName: keyof typeof serviceConfig){
              try{
                 const service = serviceConfig[serviceName];
                 const response = await firstValueFrom(
                     this.httpService.get(`${service.url}/health`, { timeout: service.timeout })
                 )
                 return {status: 'ok', data: response.data};
              }catch(error: any){
                     return {status: 'error', message: error.message};
              }
              
        }
}

