import { EClass } from 'src/competition/enums/class.enum';
import { ObjectId } from 'src/interfaces/objectId';

export interface ICreateApplication {
  userId: ObjectId;

  competitionId: ObjectId;

  class: EClass;

  si: number;
}
