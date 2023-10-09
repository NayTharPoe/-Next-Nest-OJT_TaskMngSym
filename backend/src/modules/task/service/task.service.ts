import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument, TaskEntity } from '../entities/task.entities';
import { Model } from 'mongoose';
import { CreateTaskRequestDto } from '../use-case/create/create.request.dto';
import { UpdateTaskRequestDto } from '../use-case/update/update.request.dto';
import { EmployeePaginationRequestDto } from 'src/common/dtos/request/employeePagination.req.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskEntity.name) private taskModel: Model<TaskDocument>,
  ) {}

  async getAllTaskList({
    page,
    limit,
    keyword,
  }: EmployeePaginationRequestDto): Promise<any> {
    // console.log(keyword);
    let options = {};
    if (keyword) {
      options = {
        status: new RegExp(keyword.toString(), 'i'),
      };
    }
    const totalTasks = await this.taskModel.countDocuments(options);
    const data = await this.taskModel
      .find(options)
      .populate([
        {
          path: 'project',
          select: '_id projectName',
        },
        {
          path: 'assignedEmployee',
          select: '_id employeeName',
        },
      ])
      .limit(limit)
      .skip(limit * (page - 1));
    return { data, totalTasks };
  }

  async createTask(payload: CreateTaskRequestDto): Promise<TaskDocument> {
    const data = await this.taskModel.create(payload);
    return data;
  }

  async getTaskById(id: string): Promise<TaskDocument> {
    const data = await this.taskModel.findById(id).populate([
      {
        path: 'project',
        select: '_id projectName',
      },
      {
        path: 'assignedEmployee',
        select: '_id employeeName',
      },
    ]);
    if (!data) {
      throw new NotFoundException('This task does not exists!');
    }
    return data;
  }

  async updateTask(
    id: string,
    payload: UpdateTaskRequestDto,
  ): Promise<TaskDocument> {
    const task = await this.taskModel.findOne({ _id: id });

    if (!task) {
      throw new NotFoundException('No task with this id! you cannot update');
    }
    const data = await this.taskModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return data;
  }

  async removeTask(id: string) {
    const task = await this.taskModel.findOne({ _id: id });

    if (!task) {
      throw new NotFoundException('No task with this id! you cannot delete');
    }
    return await this.taskModel.findByIdAndDelete(id);
  }
}
