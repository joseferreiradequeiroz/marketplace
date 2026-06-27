import { Module } from '@nestjs/common';
import { ProxyService } from './services/proxy.service';
import { HttpModule } from '@nestjs/axios';

@Module({
       imports: [HttpModule],
       exports: [ProxyService],
       providers: [ProxyService]
})
export class ProxyModule {}
