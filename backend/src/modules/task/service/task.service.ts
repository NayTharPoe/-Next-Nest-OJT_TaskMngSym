import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { task } from '../entities/task.entities';
import { Model } from 'mongoose';
import { CreateTaskRequestDto } from '../use-case/create/create.request.dto';
import { UpdateTaskRequestDto } from '../use-case/update/update.request.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(task.name) private taskModel: Model<task>) {}

  async getAllTaskList(): Promise<task[]> {
    const data = await this.taskModel.find().populate([
      {
        path: 'project',
        select: '_id projectName',
      },
      {
        path: 'assignedEmployee',
        select: '_id employeeName',
      },
    ]);
    return data;
  }

  async createTask(payload: CreateTaskRequestDto): Promise<task> {
    const data = await this.taskModel.create(payload);
    return data;
  }

  async getTaskById(id: string): Promise<task> {
    const data = await this.taskModel.findById(id);
    if (!data) {
      throw new NotFoundException('This user does not exists!');
    }
    return data;
  }

  async updateTask(id: string, payload: UpdateTaskRequestDto): Promise<task> {
    const data = await this.taskModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return data;
  }
}
