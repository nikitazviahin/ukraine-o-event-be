import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './user.model';
import { ICreateUser } from './interfaces/createUser.interface';
import { ObjectId } from '../interfaces/objectId';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(userData: ICreateUser) {
    const { email, password, club, si } = userData;
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const isUserExists = await this.getUserByEmail(email);

    if (isUserExists)
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );

    const user = {
      ...userData,
      password: hashedPassword,
    };

    if (club) user.club = club;
    if (si) user.si = si;

    const newUser = await this.userModel.create(user);

    return { id: newUser.id };
  }

  async getUserById(id: ObjectId) {
    return await this.userModel.findById(id);
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
