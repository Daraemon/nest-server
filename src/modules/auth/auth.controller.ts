import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

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
}
