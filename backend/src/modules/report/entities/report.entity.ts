import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReportDocument = ReportEntity & Document;

@Schema({ collection: 'reports', timestamps: true })
export class ReportEntity extends Document {
  @Prop({ required: true })
  reportTo: string;

  @Prop({ required: true })
  taskId: string;

  @Prop()
  taskTitle: string;

  @Prop()
  project: string;

  @Prop({ required: true })
  percentage: number;

  @Prop({ required: true })
  types: string;

  @Prop({ required: true })
  status: number;

  @Prop({ required: true })
  hour: number;

  @Prop({ required: true })
  reportBy: string;

  @Prop()
  problemFeeling: string;
}

export const ReportSchema = SchemaFactory.createForClass(ReportEntity);