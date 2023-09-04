import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserDocument } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(email: string, password: string) {
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const isUserExists = await this.userModel.findOne({ email });

    if (isUserExists)
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );

    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
    });

    return { id: newUser.id };
  }

  async getUserById(id: ObjectId) {
    return await this.userModel.findById(id);
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}