import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportRequestDto } from '../use-case/create/create.request.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReportDocument, ReportEntity } from '../entities/report.entity';
import { ReportPaginationRequestDto } from 'src/common/dtos/request/reportPagination.req.dto';
@Injectable()
export class ReportService {
  constructor(
    @InjectModel(ReportEntity.name)
    private readonly reportModel: Model<ReportDocument>,
  ) {}

  // create service
  async create(
    createReportDto: CreateReportRequestDto[],
  ): Promise<ReportDocument[]> {
    const report = await this.reportModel.insertMany(createReportDto);
    return report;
  }

  // find all service
  async findAll({
    limit,
    page,
    date,
    reportBy,
    reportTo,
  }: ReportPaginationRequestDto): Promise<{
    reports: ReportDocument[];
    totalReports: number;
  }> {
    const query: any = {};

    if (date) {
      query.createdAt = {
        $gte: new Date(date + 'T00:00:00Z'),
        $lte: new Date(date + 'T23:59:59Z'),
      };
    }

    if (reportBy) {
      query['reportBy.employeeName']  = {
        $regex: new RegExp(reportBy, 'i'),
      };
    }

    if (reportTo) {
      query.reportTo = {
        $regex: new RegExp(reportTo, 'i'),
      };
    }

    const totalReports = await this.reportModel.countDocuments(query);

    const reports = await this.reportModel
      .find(query)
      .populate([
        {
          path: 'reportTo',
          select: '-password -__v -token',
        },
      ])
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 })
      .select('-__v');

    return { reports, totalReports };
  }

  // find one service
  async findOne(id: string): Promise<ReportDocument> {
    const report = (await this.reportModel.findById(id)).populate([
      {
        path: 'reportTo',
        select: '-password -__v -token',
      },
    ]);
    if (!report) {
      throw new NotFoundException(
        'There is no report with this id to retrieve',
      );
    }
    return report;
  }

  // update service
  async update(
    id: string,
    updateReportDto: CreateReportRequestDto,
  ): Promise<ReportDocument> {
    const report = await this.reportModel.findById(id);
    if (!report) {
      throw new NotFoundException('There is no report with this id to update');
    }
    return await this.reportModel.findByIdAndUpdate(id, updateReportDto, {
      new: true,
    });
  }

  // remove service
  async remove(id: string): Promise<ReportDocument> {
    const report = await this.reportModel.findById(id);
    if (!report) {
      throw new NotFoundException('There is no report with this id to delete');
    }

    return await this.reportModel.findByIdAndRemove(id);
  }
}
