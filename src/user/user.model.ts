import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import EUserRole from './interfaces/userRole.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    required: true,
    enum: EUserRole,
    default: EUserRole.Customer,
  })
  role: EUserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
