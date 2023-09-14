import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
// import { ProjectEntity, ProjectDocument } from '../entities/project.entity';
import { CreateProjectRequestDto } from '../use-case/create/create.request.dto';
import { UpdateProjectRequestDto } from '../use-case/update/update.request.dto';
import { project } from '../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(project.name)
    private readonly projectModel: Model<project>,
  ) {}

  // create service
  async create(createProjectDto: CreateProjectRequestDto): Promise<project> {
    const newProject = new this.projectModel(createProjectDto);
    return await newProject.save();
  }

  // find service
  async findAll(
    query: Query,
  ): Promise<{ projects: project[]; totalProjects: number }> {
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const totalProjects = await this.projectModel.countDocuments();

    const projects = await this.projectModel
      .find()
      .limit(resPerPage)
      .skip(skip)
      .sort({ createdAt: -1 })
      .select('-__v');

    const result = { projects, totalProjects };
    return result;
  }

  // find one service
  async findOne(id: string): Promise<project> {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new HttpException(
        'There is no project with this id to retrieve',
        HttpStatus.NOT_FOUND,
      );
    }

    return project;
  }

  // update service
  async update(
    id: string,
    updateProjectDto: UpdateProjectRequestDto,
  ): Promise<project> {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new HttpException(
        'There is no project with this id to update',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.projectModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }

  // delete service
  async remove(id: string): Promise<project> {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new HttpException(
        'There is no project with this id to delete',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.projectModel.findByIdAndDelete(id);
  }
}
