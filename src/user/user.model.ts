import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EUserRole } from './enums/userRole.enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({
    type: [String],
    required: true,
    enum: EUserRole,
    default: [EUserRole.Customer],
  })
  roles: EUserRole[];

  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @Prop({ type: String })
  club: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
