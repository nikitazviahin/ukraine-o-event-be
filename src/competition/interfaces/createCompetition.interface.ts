import { EClass } from '../enums/class.enum';
import { ObjectId } from 'src/interfaces/objectId';

export interface ICreateCompetition {
  name: string;

  description: string;

  competitionDate: Date;

  city: string;

  classes: EClass[];

  ownerId: ObjectId;
}
