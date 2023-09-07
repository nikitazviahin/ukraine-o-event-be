import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { EClass } from '../interfaces/class.enum';
import { EDay } from '../interfaces/day.enum';

export class UpdateCompetitionByIdDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endDate: Date;

  @ApiProperty()
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
