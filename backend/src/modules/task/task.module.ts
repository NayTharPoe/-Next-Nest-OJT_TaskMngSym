import { Module } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { CreateController } from './use-case/create/create.controller';
import { GetAllController } from './use-case/get-all/get-all.controller';
import { GetOneController } from './use-case/get-one/get-one.controller';
import { UpdateController } from './use-case/update/update.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { taskSchema } from './entities/task.entities';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/common/constants/constant';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'task', schema: taskSchema }]),
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
  ],
  providers: [TaskService],
})
export class TaskModule {}
