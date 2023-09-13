import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EClass } from 'src/competition/enums/class.enum';

export type ApplicationDocument = Application & Document;

@Schema({ versionKey: false })
export class Application {
  @Prop({ type: Types.ObjectId, required: true, ref: 'user' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'competition' })
  competitionId: Types.ObjectId;

  @Prop({ type: String, required: true, enum: EClass })
  class: EClass;

  @Prop({ type: Boolean, required: true, default: false })
  isPayed: boolean;

  @Prop({ type: Number, required: true })
  si: number;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
