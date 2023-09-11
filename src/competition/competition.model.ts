import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EClass } from './enums/class.enum';

export type CompetitionDocument = Competition & Document;

@Schema({ versionKey: false })
export class Competition {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  competitionDate: string;

  @Prop({ type: String, required: true })
  place: string;

  @Prop({ type: [String], required: true, enum: EClass })
  classes: EClass[];

  @Prop({ type: Types.ObjectId, required: true, ref: 'user' })
  ownerId: Types.ObjectId;
}

export const CompetitionSchema = SchemaFactory.createForClass(Competition);
