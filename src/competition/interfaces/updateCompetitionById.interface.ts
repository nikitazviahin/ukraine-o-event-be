import { ObjectId } from 'src/interfaces/objectId';
import { ICreateCompetition } from './createCompetition.interface';

export interface IUpdateCompetitionById extends Partial<ICreateCompetition> {
  competitionId: ObjectId;

  userId: ObjectId;
}
