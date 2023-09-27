import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CompetitionDocument = Competition & Document;

export enum EClass {
  M21 = 'M21',
  W21 = 'W21',
  M20 = 'M20',
  W20 = 'W20',
  M18 = 'M18',
  W18 = 'W18',
}

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
