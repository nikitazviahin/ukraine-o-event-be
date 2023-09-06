import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompetitionDocument } from './competition.model';
import { ICreateCompetition } from './interfaces/createCompetition.interface';
import { ObjectId } from 'src/helpers/objectId';

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

  async getCompetitionsByOwnedId(ownerId: ObjectId) {
    const competitions = await this.competitionModel.find({
      ownerId,
    });

    return competitions;
  }
}
