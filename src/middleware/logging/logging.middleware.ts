import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP')
  use(req: any, res: any, next: () => void) {
   const { method, originalUrl } = req;
   const userAgent = req.get('User-Agent') || '';
   const ip = req.ip || req.connection.remoteAddress;
   const startTime = Date.now();

   this.logger.log(`Incoming Request: ${method} ${originalUrl} - User Agent: ${userAgent} - IP: ${ip}, Duration: ${Date.now() - startTime}ms`);
   
   res.on('finish', () => {
    const {statusCode} = res;
    const contentLength = res.get('Content-Length');
    const duration = Date.now() - startTime;

    this.logger.log(`${req.method} ${req.originalUrl} ${statusCode} ${contentLength || 0} - ${duration}ms`);

    if(statusCode >= 400){
      this.logger.error(`Error response: ${req.method} ${req.originalUrl} ${statusCode} ${contentLength || 0} - ${duration}ms`);
    }
    });

    res.on('error', (err: any) => {
      this.logger.error(`Response error: ${req.method} ${req.originalUrl} - ${err.message}`);
    });

    res.on('timeout', () => {
      this.logger.warn(`Response timeout: ${req.method} ${req.originalUrl}`);
    });

    next();

  }
}
