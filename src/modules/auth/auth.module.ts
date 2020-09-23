import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { CryptoUtil } from 'src/utils/crypto.util';
import { CaptchaMiddleware } from 'src/middlewares/captcha.middleware';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET_KEY,
        signOptions: {
          expiresIn: '600s',
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, CryptoUtil]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CaptchaMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST })
  }
}
