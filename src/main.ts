import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  })
  app.setGlobalPrefix('api')
  app.enableCors()
  const config = new DocumentBuilder()
    .setTitle('Budget app')
    .setDescription('The budget app api examples')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)
  await app.listen(3001)
}
bootstrap()
