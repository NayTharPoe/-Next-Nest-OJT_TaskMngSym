import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationEntity,
  NotificationSchema,
} from './entities/notification.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokenEntity } from '../auth/tokens/entities/token.entities';
import { tokenSchema } from '../auth/tokens/entities/token.entities';
import { TokenService } from '../auth/tokens/service/token.service';
import { SECRET_KEY } from 'src/common/constants/constant';
import { CreateNotificationController } from './use-case/create/create.controller';
import { NotificationService } from './service/notification.service';
import { GetAllNotificationController } from './use-case/get-all/get-all.controller';
import { UpdateNotificationController } from './use-case/update/update.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationEntity.name, schema: NotificationSchema },
    ]),
    MongooseModule.forFeature([
      { name: TokenEntity.name, schema: tokenSchema },
    ]),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1D' },
    }),
  ],
  controllers: [
    GetAllNotificationController,
    CreateNotificationController,
    UpdateNotificationController,
  ],
  providers: [TokenService, NotificationService],
})
export class NotificationModule {}
