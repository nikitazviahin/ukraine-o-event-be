import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './users.model';
import * as bcrypt from 'bcrypt';
import IUser from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(email: string, password: string): Promise<{ id: ObjectId }> {
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

  async getUserById(id: ObjectId): Promise<IUser> {
    return await this.userModel.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email });
  }
}
