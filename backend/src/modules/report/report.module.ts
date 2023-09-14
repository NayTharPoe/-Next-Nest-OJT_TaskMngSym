import { Module } from '@nestjs/common';
import { ReportService } from './services/report.service';
import { CreateReportController } from './use-case/create/create.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportSchema } from './entities/report.entity';
import { UpdateReportController } from './use-case/update/update.controller';
import { DeleteReportController } from './use-case/delete/delete.controller';
import { GetAllReportController } from './use-case/get-all/get-all.controller';
import { GetDetailReportController } from './use-case/get-one/get-one.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'report', schema: ReportSchema },
    ]),
  ],
  controllers: [
    GetAllReportController,
    GetDetailReportController,
    CreateReportController,
    UpdateReportController,
    DeleteReportController,
  ],
  providers: [ReportService],
})
export class ReportModule {}
