import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'src/interfaces/objectId';
import { EClass } from '../competition.model';

export class CompetitionCreatedResponse {
  @ApiProperty({ example: '65006a51c2bb6ab38dbd9068' })
  id: ObjectId;
}

export class GetCompetitionResponse {
  @ApiProperty({
    description: 'Competition id',
    example: '65006a51c2bb6ab38dbd9068',
  })
  _id: ObjectId;

  @ApiProperty({ description: 'Competition name', example: 'Lion-cup' })
  name: string;

  @ApiProperty({
    description: 'Competition description',
    example: 'Annual competition with great distances etc...',
  })
  description: string;

  @ApiProperty({ description: 'Competition date', example: '2023-08-11' })
  competitionDate: Date;

  @ApiProperty({
    description: 'Place or area where competition is held',
    example: 'Lviv',
  })
  place: string;

  @ApiProperty({
    enum: EClass,
    isArray: true,
    example: [EClass.M21, EClass.W21],
  })
  classes: EClass[];
}
