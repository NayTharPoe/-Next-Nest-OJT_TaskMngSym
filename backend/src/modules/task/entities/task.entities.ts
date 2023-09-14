import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class task {
  @Prop({ ref: 'project', required: true })
  project: string;

  @Prop({ ref: 'employee', required: true })
  assignedEmployee: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  estimateHour: string;

  @Prop({ default: true })
  actualHour: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  estimate_start_date: string;

  @Prop()
  estimate_finish_date: string;

  @Prop()
  actual_start_date: string;

  @Prop()
  actual_finish_date: string;
}

export const taskSchema = SchemaFactory.createForClass(task);
