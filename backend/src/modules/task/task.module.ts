import { Module } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { CreateController } from './use-case/create/create.controller';
import { GetAllController } from './use-case/get-all/get-all.controller';
import { GetOneController } from './use-case/get-one/get-one.controller';
import { UpdateController } from './use-case/update/update.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskEntity, taskSchema } from './entities/task.entities';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/common/constants/constant';
import { TokenService } from '../auth/tokens/service/token.service';
import {
  TokenEntity,
  tokenSchema,
} from '../auth/tokens/entities/token.entities';
import { DeleteController } from './use-case/delete/delete.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskEntity.name, schema: taskSchema }]),
    MongooseModule.forFeature([
      { name: TokenEntity.name, schema: tokenSchema },
    ]),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1D' },
    }),
  ],
  controllers: [
    GetAllController,
    CreateController,
    GetOneController,
    UpdateController,
    DeleteController,
  ],
  providers: [TaskService, TokenService],
})
export class TaskModule {}
