import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './entities/project.entity';
import { ProjectService } from './service/project.service';
import { GetAllProjectController } from './use-case/get-all/get-all.controller';
import { GetDetailProjectController } from './use-case/get-one/get-one.controller';
import { CreateProjectController } from './use-case/create/create.controller';
import { UpdateProjectController } from './use-case/update/update.controller';
import { DeleteProjectController } from './use-case/delete/delete.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'project', schema: ProjectSchema }]),
  ],
  controllers: [
    GetAllProjectController,
    GetDetailProjectController,
    CreateProjectController,
    UpdateProjectController,
    DeleteProjectController,
  ],
  providers: [ProjectService],
})
export class ProjectModule {}
