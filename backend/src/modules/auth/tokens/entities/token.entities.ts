import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class token {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  token: string;
}

export const tokenSchema = SchemaFactory.createForClass(token);
