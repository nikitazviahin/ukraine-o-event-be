import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { ApplicationSchema } from './application.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'application', schema: ApplicationSchema },
    ]),
  ],
  providers: [ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
