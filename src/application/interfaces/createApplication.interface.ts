import { EClass } from 'src/competition/competition.model';
import { ObjectId } from 'src/interfaces/objectId';

export interface ICreateApplication {
  userId: ObjectId;

  competitionId: ObjectId;

  class: EClass;

  si: number;
}
