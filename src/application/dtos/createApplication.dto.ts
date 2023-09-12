import { IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { EClass } from 'src/competition/enums/class.enum';
import { ObjectId } from 'src/interfaces/objectId';

export class CreateApplicationDto {
  @IsMongoId()
  userId: ObjectId;

  @IsMongoId()
  competitionId: ObjectId;

  @IsEnum(EClass)
  class: EClass;

  @IsNumber()
  si: number;
}
