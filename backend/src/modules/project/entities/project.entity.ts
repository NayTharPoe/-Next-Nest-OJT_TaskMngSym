import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = ProjectEntity & Document;

@Schema({ collection:'projects', timestamps: true })
export class ProjectEntity {
  @Prop({ required: true, unique: true })
  projectName: string;

  @Prop({ required: true })
  language: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectEntity);
