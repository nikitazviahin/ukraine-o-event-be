import { ObjectId } from 'src/interfaces/objectId';
import { EClass } from '../competition.model';

export interface ICreateCompetition {
  name: string;

  description: string;

  competitionDate: Date;

  place: string;

  classes: EClass[];

  ownerId: ObjectId;
}
