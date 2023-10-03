import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EmployeeEntity } from 'src/modules/employee/entities/employee.entities';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';

export type TaskDocument = TaskEntity & Document;

@Schema({ collection: 'tasks', timestamps: true })
export class TaskEntity {
  @Prop({ ref: ProjectEntity.name, required: true })
  project: string;

  @Prop({ ref: EmployeeEntity.name, required: true })
  assignedEmployee: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  estimateHour: number;

  @Prop()
  actualHour: number;

  @Prop()
  status: string;

  @Prop({ required: true })
  estimate_start_date: string;

  @Prop({ required: true })
  estimate_finish_date: string;

  @Prop()
  actual_start_date: string;

  @Prop()
  actual_finish_date: string;
}

export const taskSchema = SchemaFactory.createForClass(TaskEntity);
