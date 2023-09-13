import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { ApplicationSchema } from './application.model';
import { UserService } from 'src/user/user.service';
import { CompetitionService } from 'src/competition/competition.service';
import { UserModule } from 'src/user/user.module';
import { CompetitionModule } from 'src/competition/competition.module';
import { UserSchema } from 'src/user/user.model';
import { CompetitionSchema } from 'src/competition/competition.model';

@Module({
  imports: [
    UserModule,
    CompetitionModule,
    MongooseModule.forFeature([
      { name: 'application', schema: ApplicationSchema },
      { name: 'user', schema: UserSchema },
      { name: 'competition', schema: CompetitionSchema },
    ]),
  ],
  providers: [UserService, CompetitionService, ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
