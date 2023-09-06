import { Request } from 'express';
import { ObjectId } from '../helpers/objectId';

interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: ObjectId;
  };
}

export { IGetUserAuthInfoRequest };
