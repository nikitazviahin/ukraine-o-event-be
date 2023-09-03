import { ObjectId } from 'mongoose';

export default interface IUser {
  id?: ObjectId;

  email: string;

  password?: string;
}
