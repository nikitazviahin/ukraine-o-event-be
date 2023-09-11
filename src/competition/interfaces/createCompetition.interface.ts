import { EClass } from '../enums/class.enum';
import { ObjectId } from 'src/interfaces/objectId';

export interface ICreateCompetition {
  name: string;

  description: string;

  competitionDate: Date;

  place: string;

  classes: EClass[];

  ownerId: ObjectId;
}
