import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Word example')
    .setDescription('The Words API description')
    .setVersion('1.0')
    .addTag('words')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalFilters(
    new DomainExceptionFilter(),
    new PrismaExceptionFilter(),
    new HttpExceptionFilter(),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
