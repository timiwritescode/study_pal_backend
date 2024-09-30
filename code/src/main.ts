import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './swagger/swagger.config';

async function bootstrap() {
  const logger = new Logger(bootstrap.name)
  const app = await NestFactory.create(AppModule);
  const port = 3002;
  // swagger 
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  
  logger.log("App started on http://localhost:" + port)
}
bootstrap();
