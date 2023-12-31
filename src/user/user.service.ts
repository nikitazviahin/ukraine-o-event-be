import { Model } from 'mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const { email, password } = userData;
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const isUserExists = await this.getUserByEmail(email);

    if (isUserExists)
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.CONFLICT,
      );

    const { _id: id } = await this.userModel.create({
      ...userData,
      password: hashedPassword,
    });

    return { id };
  }

  async getUserById(id: ObjectId) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException();

    return user;
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
