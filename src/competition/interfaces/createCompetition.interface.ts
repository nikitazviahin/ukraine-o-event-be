import { EClass } from './class.enum';
import { EDay } from './day.enum';
import { ObjectId } from 'src/interfaces/objectId';

export interface ICreateCompetition {
  name: string;

  description: string;

  startDate: string;

  endDate: string;

  city: string;

  days: EDay[];

  classes: EClass[];

  ownerId: ObjectId;
}
