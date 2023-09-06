import { Model } from 'mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompetitionDocument } from './competition.model';
import { ICreateCompetition } from './interfaces/createCompetition.interface';
import { ObjectId } from 'src/interfaces/objectId';
import { IUpdateCompetitionById } from './interfaces/updateCompetitionById.interface';

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

  async updateCompetitionById(data: IUpdateCompetitionById) {
    const competiionToUpdate = await this.competitionModel.findById(
      data.competitionId,
    );

    if (competiionToUpdate.ownerId !== data.userId)
      throw new ForbiddenException();

    const updatedCompetition = await this.competitionModel.findByIdAndUpdate(
      data.competitionId,
      {
        ...data,
      },
    );

    return updatedCompetition;
  }
}
