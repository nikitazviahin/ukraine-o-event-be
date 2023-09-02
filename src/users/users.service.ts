import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(email: string, password: string): Promise<{ id: ObjectId }> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
    });

    return { id: newUser.id };
  }

  async getUserById(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }
}
