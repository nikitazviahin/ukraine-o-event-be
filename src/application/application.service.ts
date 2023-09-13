import { Model } from 'mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApplicationDocument } from './application.model';
import { ICreateApplication } from './interfaces/createApplication.interface';
import { ObjectId } from 'src/interfaces/objectId';
import { UserService } from 'src/user/user.service';
import { CompetitionService } from 'src/competition/competition.service';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel('application')
    private readonly applicationModel: Model<ApplicationDocument>,

    private readonly userService: UserService,
    private readonly competitionService: CompetitionService,
  ) {}

  async createApplication(applicationData: ICreateApplication) {
    const { userId, competitionId } = applicationData;

    await this.userService.checkUserExists(userId);
    await this.competitionService.checkCompetitionExists(competitionId);

    if (this.checkApplicationExists(userId, competitionId))
      throw new HttpException(
        'Application already exists',
        HttpStatus.CONFLICT,
      );

    const application = await this.applicationModel.create(applicationData);

    return application;
  }

  async getApplicationById(id: ObjectId) {
    const application = await this.applicationModel.findById(id);
    if (!application) throw new NotFoundException();
    return application;
  }

  private async checkApplicationExists(
    userId: ObjectId,
    competitionId: ObjectId,
  ): Promise<boolean> {
    const applicationExists = await this.applicationModel.findOne({
      userId,
      competitionId,
    });

    return applicationExists ? true : false;
  }
}
