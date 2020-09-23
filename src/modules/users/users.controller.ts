import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @ApiOperation({summary: '创建用户'})
  @Post('create')
  async create(@Body() user: User): Promise<any> {
    const success = await this.usersService.create(user);
    console.log('success:', success);
    
    if(success) {
      return {
        code: 0,
        msg: '用户创建成功'
      }
    } else {
      return {
        code: -1,
        msg: '用户名已存在'
      }
    }
  }

  @ApiOperation({summary: '查找所有用户'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('findAll')
  async findAll() {
    return await this.usersService.findAll();
  }
}
