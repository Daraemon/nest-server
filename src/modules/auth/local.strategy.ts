import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { compareSync } from 'bcryptjs';
import { CryptoUtil } from 'src/utils/crypto.util';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly cryptoUtil: CryptoUtil
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({username}).select('+password');
    
    if (!user) {
      throw new BadRequestException('用户名不正确');
    }
    const pwd = this.cryptoUtil.decrypto(password);
    
    if (!compareSync(pwd, user.password)) {
      throw new BadRequestException('密码不正确')
    }
    return user;
  }
}