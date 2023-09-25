import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = NotificationEntity & Document;

@Schema({ collection: 'notifications', timestamps: true })
export class NotificationEntity extends Document {
  @Prop({ required: true })
  tag: string;

  @Prop({ required: true })
  createdByWhom: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  profile: string;

  @Prop({ type: [String], default: [] })
  read: string[];

  @Prop({ required: true })
  sendTo: string;
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationEntity);
