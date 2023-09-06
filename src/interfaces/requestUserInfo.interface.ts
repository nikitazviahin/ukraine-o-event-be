import { Request } from 'express';
import { ObjectId } from './objectId';

interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: ObjectId;
  };
}

export { IGetUserAuthInfoRequest };
