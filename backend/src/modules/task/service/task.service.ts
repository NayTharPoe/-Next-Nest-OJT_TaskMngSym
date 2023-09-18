import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { task } from '../entities/task.entities';
import { Model } from 'mongoose';
import { CreateTaskRequestDto } from '../use-case/create/create.request.dto';
import { UpdateTaskRequestDto } from '../use-case/update/update.request.dto';
import { PaginationRequestDto } from 'src/common/dtos/request/pagination.request.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(task.name) private taskModel: Model<task>) {}

  async getAllTaskList({ page, limit }: PaginationRequestDto): Promise<any> {
    // const taskLists = this.taskModel.find().populate([
    //   {
    //     path: 'project',
    //     select: '_id projectName',
    //   },
    //   {
    //     path: 'assignedEmployee',
    //     select: '_id employeeName',
    //   },
    // ]);
    // if (query.keyword) {
    //   taskLists.regex('title', new RegExp(query.keyword, 'i'));
    // }
    const totalTasks = await this.taskModel.countDocuments();
    const data = await this.taskModel
      .find()
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

  async createTask(payload: CreateTaskRequestDto): Promise<task> {
    const data = await this.taskModel.create(payload);
    return data;
  }

  async getTaskById(id: string): Promise<task> {
    const data = await this.taskModel.findById(id);
    if (!data) {
      throw new NotFoundException('This task does not exists!');
    }
    return data;
  }

  async updateTask(id: string, payload: UpdateTaskRequestDto): Promise<task> {
    const task = await this.taskModel.findOne({ _id: id });

    if (!task) {
      throw new NotFoundException('No task with this id! you cannot update');
    }
    const data = await this.taskModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return data;
  }
}
