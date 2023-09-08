import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { EClass } from '../enums/class.enum';
import { EDay } from '../enums/day.enum';

export class UpdateCompetitionByIdDto {
  @ApiProperty({ description: 'Competition name', example: 'Lion-cup' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Competition description',
    example: 'Annual competition with great distances etc...',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Competition start date', example: '2023-08-11' })
  @IsDateString()
  @IsOptional()
  startDate: Date;

  @ApiProperty({ description: 'Competition end date', example: '2023-08-12' })
  @IsDateString()
  @IsOptional()
  endDate: Date;

  @ApiProperty({
    description: 'City or area where competition is held',
    example: 'Lviv',
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    enum: EDay,
    isArray: true,
    example: [EDay.DAY1, EDay.DAY2],
  })
  @IsEnum(EDay, { each: true })
  @IsOptional()
  days: EDay[];

  @ApiProperty({
    enum: EClass,
    isArray: true,
    example: [EClass.M21, EClass.W21],
  })
  @IsEnum(EClass, { each: true })
  @IsOptional()
  classes: EClass[];
}
