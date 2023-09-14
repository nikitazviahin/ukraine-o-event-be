import { ApiProperty } from '@nestjs/swagger';
import { EClass } from 'src/competition/enums/class.enum';
import { ObjectId } from 'src/interfaces/objectId';

export class CreateApplicationResponse {
  @ApiProperty({ example: '65006a51c2bb6ab38dbd9068' })
  id: ObjectId;
}

export class GetApplicationResponse {
  @ApiProperty({ example: '65006a51c2bb6ab38dbd9068' })
  _id: ObjectId;

  @ApiProperty({ example: '65006a51c2bb6ab38dbd9068' })
  userId: ObjectId;

  @ApiProperty({ example: '65006a51c2bb6ab38dbd9068' })
  competitionId: ObjectId;

  @ApiProperty({ example: 'M21' })
  class: EClass;

  @ApiProperty({ example: false })
  isPayed: boolean;

  @ApiProperty({ example: 9102711 })
  si: number;
}
