import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { EClass } from '../enums/class.enum';
import { EDay } from '../enums/day.enum';

export class CreateCompetitionDto {
  @ApiProperty({ description: 'Competition name', example: 'Lion-cup' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Competition description',
    example: 'Annual competition with great distances etc...',
  })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Competition start date', example: '2023-08-11' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ description: 'Competition end date', example: '2023-08-12' })
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    description: 'City or area where competition is held',
    example: 'Lviv',
  })
  @IsString()
  city: string;

  @ApiProperty({
    enum: EDay,
    isArray: true,
    example: [EDay.DAY1, EDay.DAY2],
  })
  @IsEnum(EDay, { each: true })
  days: EDay[];

  @ApiProperty({
    enum: EClass,
    isArray: true,
    example: [EClass.M21, EClass.W21],
  })
  @IsEnum(EClass, { each: true })
  classes: EClass[];
}
