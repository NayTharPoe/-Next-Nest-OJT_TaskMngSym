import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectEntity, ProjectSchema } from './entities/project.entity';
import { ProjectService } from './service/project.service';
import { GetAllProjectController } from './use-case/get-all/get-all.controller';
import { GetDetailProjectController } from './use-case/get-one/get-one.controller';
import { CreateProjectController } from './use-case/create/create.controller';
import { UpdateProjectController } from './use-case/update/update.controller';
import { DeleteProjectController } from './use-case/delete/delete.controller';
import { JwtModule } from '@nestjs/jwt';
import { TokenEntity } from '../auth/tokens/entities/token.entities';
import { tokenSchema } from '../auth/tokens/entities/token.entities';
import { TokenService } from '../auth/tokens/service/token.service';
import { SECRET_KEY } from 'src/common/constants/constant';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectEntity.name, schema: ProjectSchema },
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
    GetAllProjectController,
    CreateProjectController,
    GetDetailProjectController,
    UpdateProjectController,
    DeleteProjectController,
  ],
  providers: [TokenService, ProjectService],
})
export class ProjectModule {}
