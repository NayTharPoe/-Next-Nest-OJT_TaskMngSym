import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = TokenEntity & Document;
@Schema({ collection:'tokens', timestamps: true })
export class TokenEntity {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  token: string;
}

export const tokenSchema = SchemaFactory.createForClass(TokenEntity);
