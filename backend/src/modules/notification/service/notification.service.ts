import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationRequestDto } from '../use-case/create/create.request.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotificationDocument,
  NotificationEntity,
} from '../entities/notification.entity';
import { UpdateNotificationRequestDto } from '../use-case/update/update.request.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationEntity.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  // create service
  async create(
    createNotificationDto: CreateNotificationRequestDto[],
  ): Promise<NotificationDocument[]> {
    const notifications = await this.notificationModel.insertMany(
      createNotificationDto,
    );
    return notifications;
  }

  // find all service
  async findAll() {
    const notifications = await this.notificationModel
      .find()
      .sort({ createdAt: -1 })
      .select('-__v');

    return notifications;
  }

  // update service
  async update(
    id: string,
    updateNotificationDto: UpdateNotificationRequestDto,
  ): Promise<NotificationDocument> {
    const existingNotification = await this.notificationModel.findOne({
      _id: id,
    });
    if (!existingNotification) {
      throw new NotFoundException(
        'There is no notification with this id to update',
      );
    }

    return await this.notificationModel.findOneAndUpdate(
      { _id: existingNotification._id },
      { $push: updateNotificationDto },
      {
        new: true,
      },
    );
  }
}
