import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { token } from '../entities/token.entities';
import { Model } from 'mongoose';

@Injectable()
export class TokenService {
  constructor(@InjectModel(token.name) private tokenModel: Model<token>) {}

  async createToken(email: string, token: string) {
    await this.tokenModel.create({ email, token });
  }

  async deleteToken(token: string) {
    await this.tokenModel.findOneAndDelete({ token });
  }

  async findToken(token: string) {
    const isExistToken = await this.tokenModel.findOne({ token });
    if (!isExistToken) {
      throw new UnauthorizedException();
    }
  }
}
