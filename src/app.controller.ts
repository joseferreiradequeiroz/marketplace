import { Controller, Get } from "@nestjs/common";
import { ProxyService } from "./proxy/services/proxy.service";

@Controller('health')
export class AppController{
       constructor(private proxyService: ProxyService){}
       @Get()
       async getHealth(){
              return {
                     status: 'ok', 
                     timeStamp: new Date().toISOString(),
                     services: {
                            users: await this.proxyService.getServiceHealth('users'),
                            products: await this.proxyService.getServiceHealth('products'),
                            checkout: await this.proxyService.getServiceHealth('checkout'),
                            payment: await this.proxyService.getServiceHealth('payment')
                     }
              };
       }
}