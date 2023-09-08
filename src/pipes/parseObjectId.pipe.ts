import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { ObjectId } from 'src/interfaces/objectId';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
  transform(value: any): Types.ObjectId {
    const validObjectId = Types.ObjectId.isValid(value);

    if (!validObjectId) throw new BadRequestException('Invalid id');

    return new Types.ObjectId(value);
  }
}
