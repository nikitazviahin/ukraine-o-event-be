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

    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const competition = await this.competitionService.getCompetitionById(
      competitionId,
    );
    if (!competition) throw new NotFoundException('Competition not found');

    const applicationExists = await this.applicationModel.findOne({
      userId,
      competitionId,
    });

    if (applicationExists)
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
}
