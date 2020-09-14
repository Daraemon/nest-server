import { ApiProperty } from "@nestjs/swagger";

/**
 * 用户登录dto
 */
export class LoginDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly password: string;
}