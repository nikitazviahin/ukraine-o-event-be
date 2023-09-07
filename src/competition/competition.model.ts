import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EClass } from './enums/class.enum';
import { EDay } from './enums/day.enum';

export type CompetitionDocument = Competition & Document;

@Schema({ versionKey: false })
export class Competition {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  startDate: string;

  @Prop({ type: String, required: true })
  endDate: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: [String], required: true, enum: EDay })
  days: EDay[];

  @Prop({ type: [String], required: true, enum: EClass })
  classes: EClass[];

  @Prop({ type: mongoose.Types.ObjectId, required: true })
  ownerId: mongoose.Types.ObjectId;
}

export const CompetitionSchema = SchemaFactory.createForClass(Competition);
