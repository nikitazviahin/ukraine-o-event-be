import { Model } from 'mongoose';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompetitionDocument } from './competition.model';
import { ICreateCompetition } from './interfaces/createCompetition.interface';
import { ObjectId } from 'src/interfaces/objectId';
import { IUpdateCompetitionById } from './interfaces/updateCompetitionById.interface';
import { castObjectId } from 'src/helpers/castObjectId';

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
    const competitionId = castObjectId(data.competitionId);
    const competitionToUpdate = await this.competitionModel.findById(
      competitionId,
    );

    if (!competitionToUpdate) throw new NotFoundException();

    if (competitionToUpdate.ownerId !== data.userId)
      throw new ForbiddenException();

    const updatedCompetition = await this.competitionModel.findByIdAndUpdate(
      competitionId,
      {
        ...data,
      },
      { new: true },
    );

    return updatedCompetition;
  }
}
