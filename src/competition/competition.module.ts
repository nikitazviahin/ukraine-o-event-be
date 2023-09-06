import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CompetitionService } from './competition.service';
import { CompetitionController } from './competition.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompetitionSchema } from './competition.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'competition', schema: CompetitionSchema },
    ]),
  ],
  providers: [CompetitionService],
  controllers: [CompetitionController],
})
export class CompetitionModule {}
