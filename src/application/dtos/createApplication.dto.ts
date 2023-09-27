import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { EClass } from 'src/competition/competition.model';
import { ObjectId } from 'src/interfaces/objectId';

export class CreateApplicationDto {
  @ApiProperty({
    description: 'Applicant id',
    example: '65006a51c2bb6ab38dbd9068',
  })
  @IsMongoId()
  userId: ObjectId;

  @ApiProperty({
    description: 'Competition id',
    example: '65006a51c2bb6ab38dbd9068',
  })
  @IsMongoId()
  competitionId: ObjectId;

  @ApiProperty({
    description: "Applicant's class",
    example: 'M21',
  })
  @IsEnum(EClass)
  class: EClass;

  @ApiProperty({
    description: "Applicant's si",
    example: 9102711,
  })
  @IsNumber()
  si: number;
}
