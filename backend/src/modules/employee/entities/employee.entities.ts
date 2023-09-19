import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = EmployeeEntity & Document;
@Schema({ collection: 'employees', timestamps: true })
export class EmployeeEntity {
  @Prop({ required: true })
  employeeName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  token: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop()
  profile: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  dob: string;

  @Prop({ required: true })
  position: string;
}

export const employeeSchema = SchemaFactory.createForClass(EmployeeEntity);
