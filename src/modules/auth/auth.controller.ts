import { Controller, Req, Post, UseGuards, Session, Response, Get, Request } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import * as svgCaptcha from 'svg-captcha';

@ApiTags('认证模块')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly jwtService: JwtService,
  ) {}


  @ApiOperation({ summary: '注册' })
  @ApiBody({type: RegisterDto})
  @Post('register')
  async register(@Req() req): Promise<any> {
    return {}
  }

  @ApiOperation({ summary: '登录' })
  @ApiBody({type: LoginDto})
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req): Promise<any> {
    const user = req.user;
    const payload = {username: user.username, sub: user._id }
    return {
      token: this.jwtService.sign(payload),
    };
  }

  @ApiOperation({summary: '获取验证码'})
  @Get('getCaptcha')
  async getCaptcha(@Request() req, @Response() res) {
    const captcha = svgCaptcha.create({
      size: 4,
      height: 34,
      ignoreChars: '0o1iIlO',
      fontSize: 38
    });
    const captchaTime = new Date().getTime();
    req.session.captcha = captcha.text;
    req.session.captchaTime = captchaTime;
    
    res.type('svg');
    res.status(200).send(captcha.data);
  }
}
