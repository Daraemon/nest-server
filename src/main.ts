import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 允许跨域
  // app.enableCors();
  app.use(session({
    secret: 'luckystar',
    name: 'captcha',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 50000 },
    rolling: true,
  }));
  
  const options = new DocumentBuilder()
    .setTitle('nest-server-api')
    .setDescription('api')
    .setVersion('1.0')
    .addBearerAuth()//为api接口授权
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log('mongo:', process.env.DB);

  

  console.log('http://127.0.0.1:3000/api-docs');
  
}
bootstrap();
