import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CONFIGURACIÓN CORS (Crucial para que Flutter Web no falle)
  app.enableCors({
    origin: '*', // Permite conexiones desde cualquier IP o Dominio
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 2. VALIDACIONES GLOBALES
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // Elimina datos que no estén en el DTO
    transform: true,            // Convierte tipos automáticamente (ej: string a number)
    forbidNonWhitelisted: true, // Lanza error si envían datos extra
  }));

  // 3. DOCUMENTACIÓN SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Ethos API')
    .setDescription('The Ethos API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 4. PUERTO DINÁMICO (Obligatorio para Render/Heroku/DigitalOcean)
  // Si Render nos da un puerto, usamos ese. Si estamos en local, usamos el 3000.
  await app.listen(process.env.PORT || 3000);

  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();