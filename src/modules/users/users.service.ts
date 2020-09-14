import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>
  ) {}

  async create(user: User): Promise<boolean> {
    const createUser = new this.userModel(user);
    try {
      await createUser.save();
      return true;
    } catch (error) {
      console.log('error=',error);
      return false;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
