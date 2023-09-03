import { ObjectId } from 'mongoose';

export default interface IUser {
  email: string;

  id?: ObjectId;

  password?: string;
}
