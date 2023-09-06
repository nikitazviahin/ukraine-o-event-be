import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompetitionDocument } from './competition.model';
import { ICreateCompetition } from './interfaces/createCompetition.interface';

@Injectable()
export class CompetitionService {
  constructor(
    @InjectModel('competition')
    private readonly competitionModel: Model<CompetitionDocument>,
  ) {}

  async createCompetition(competitionData: ICreateCompetition) {
    const competition = await this.competitionModel.create(competitionData);
    return { competitionId: competition._id };
  }
}
