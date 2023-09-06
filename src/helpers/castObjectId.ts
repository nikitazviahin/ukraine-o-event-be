import mongoose from 'mongoose';
import { ObjectId } from 'src/interfaces/objectId';

export function castObjectId(id: string | ObjectId): ObjectId {
  return new mongoose.Types.ObjectId(id);
}
