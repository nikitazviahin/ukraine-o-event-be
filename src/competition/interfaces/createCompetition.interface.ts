import { EClass } from '../enums/class.enum';
import { EDay } from '../enums/day.enum';
import { ObjectId } from 'src/interfaces/objectId';

export interface ICreateCompetition {
  name: string;

  description: string;

  startDate: Date;

  endDate: Date;

  city: string;

  days: EDay[];

  classes: EClass[];

  ownerId: ObjectId;
}
