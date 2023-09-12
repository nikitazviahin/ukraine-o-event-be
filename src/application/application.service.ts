import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApplicationDocument } from './application.model';
import { ICreateApplication } from './interfaces/createApplication.interface';
import { ObjectId } from 'src/interfaces/objectId';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel('application')
    private readonly applicationModel: Model<ApplicationDocument>,
  ) {}

  async createApplication(applicationData: ICreateApplication) {
    const { userId, competitionId } = applicationData;

    const isApplicationExist = await this.applicationModel.findOne({
      userId,
      competitionId,
    });

    if (isApplicationExist) throw new BadRequestException();

    const application = await this.applicationModel.create(applicationData);

    return application;
  }

  async getApplicationById(id: ObjectId) {
    const application = await this.applicationModel.findById(id);
    return application;
  }
}
