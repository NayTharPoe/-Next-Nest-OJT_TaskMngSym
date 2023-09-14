import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportRequestDto } from '../use-case/create/create.request.dto';
import { Query } from 'express-serve-static-core';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReportDocument } from '../entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel('report')
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
  async findAll(
    query: Query,
  ): Promise<{ reports: ReportDocument[]; totalReports: number }> {
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const totalReports = await this.reportModel.countDocuments();

    const reports = await this.reportModel
      .find()
      .limit(resPerPage)
      .skip(skip)
      .sort({ createdAt: -1 })
      .select('-__v');

    return { reports, totalReports };
  }

  // find one service
  async findOne(id: string): Promise<ReportDocument> {
    const report = await this.reportModel.findById(id);
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
