import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { EClass } from '../interfaces/class.enum';
import { EDay } from '../interfaces/day.enum';

export class CreateCompetitionDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsString()
  endDate: string;

  @ApiProperty()
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
