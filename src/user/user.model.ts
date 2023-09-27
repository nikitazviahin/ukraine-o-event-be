import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { isEmail } from 'class-validator';

export enum EUserRole {
  Customer = 'customer',
  Creator = 'creator',
}

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, 'Invalid email'],
  })
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
    maxlength: 50,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
    maxlength: 50,
  })
  lastName: string;

  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @Prop({ type: String, maxlength: 100 })
  club: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
