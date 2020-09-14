import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // 异步连接数据库
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DB,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
