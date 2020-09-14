import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { hashSync } from 'bcryptjs';

@Schema({
  timestamps: true,
})
export class User extends Document {
  
  @ApiProperty()
  @Prop({
    unique: true,
  })
  username: string;

  @ApiProperty()
  @Prop({
    select: false,
    set: (value) => {return value ? hashSync(value) : value;},
    get: (value) => value, 
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);