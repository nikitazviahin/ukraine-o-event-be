import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { EClass } from '../enums/class.enum';

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

  @ApiProperty({ description: 'Competition date', example: '2023-08-11' })
  @IsDateString()
  @IsOptional()
  competitionDate: Date;

  @ApiProperty({
    description: 'Place or area where competition is held',
    example: 'Lviv',
  })
  @IsString()
  @IsOptional()
  place: string;

  @ApiProperty({
    enum: EClass,
    isArray: true,
    example: [EClass.M21, EClass.W21],
  })
  @IsEnum(EClass, { each: true })
  @IsOptional()
  classes: EClass[];
}
