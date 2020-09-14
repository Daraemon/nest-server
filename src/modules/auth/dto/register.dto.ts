import { ApiProperty } from "@nestjs/swagger";

/**
 * 用户注册dto
 */
export class RegisterDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly password: string;
}