import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfigFactory } from './infra/database/database.config.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AuthModule } from './modules/auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ReportModule } from './modules/report/report.module';
import { SocketIoGateway } from './socket/socket.gateway';

@Module({
  imports: [
    AuthModule,
    EmployeeModule,
    ProjectModule,
    TaskModule,
    ReportModule,
    NotificationModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongooseConfigFactory,
      inject: [ConfigService],
    }),
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketIoGateway],
})
export class AppModule {}
