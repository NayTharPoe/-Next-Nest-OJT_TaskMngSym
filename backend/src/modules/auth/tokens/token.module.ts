import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { tokenSchema } from './entities/token.entities';
import { TokenService } from './service/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'token', schema: tokenSchema }]),
  ],
  controllers: [],
  providers: [TokenService],
})
export class TokenModule {}
