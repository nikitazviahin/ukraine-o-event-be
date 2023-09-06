import { ObjectId } from 'src/interfaces/objectId';
import { EClass } from './class.enum';
import { EDay } from './day.enum';

export interface IUpdateCompetitionById {
  competitionId: ObjectId;

  userId: ObjectId;

  name?: string;

  description?: string;

  startDate?: string;

  endDate?: string;

  city?: string;

  days?: EDay[];

  classes?: EClass[];
}
