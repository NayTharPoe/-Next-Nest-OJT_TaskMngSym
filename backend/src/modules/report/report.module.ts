import { Module } from '@nestjs/common';
import { ReportService } from './services/report.service';
import { CreateReportController } from './use-case/create/create.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportEntity, ReportSchema } from './entities/report.entity';
import { UpdateReportController } from './use-case/update/update.controller';
import { DeleteReportController } from './use-case/delete/delete.controller';
import { GetAllReportController } from './use-case/get-all/get-all.controller';
import { GetDetailReportController } from './use-case/get-one/get-one.controller';
import { JwtModule } from '@nestjs/jwt';
import { TokenEntity } from '../auth/tokens/entities/token.entities';
import { tokenSchema } from '../auth/tokens/entities/token.entities';
import { TokenService } from '../auth/tokens/service/token.service';
import { SECRET_KEY } from 'src/common/constants/constant';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReportEntity.name, schema: ReportSchema },
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
    GetAllReportController,
    CreateReportController,
    GetDetailReportController,
    UpdateReportController,
    DeleteReportController,
  ],
  providers: [TokenService, ReportService],
})
export class ReportModule {}
