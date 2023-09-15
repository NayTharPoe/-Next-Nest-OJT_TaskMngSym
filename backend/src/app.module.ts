import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfigFactory } from './infra/database/database.config.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { ReportModule } from './modules/report/report.module';

const configService = new ConfigService();

@Module({
  imports: [
    EmployeeModule,
    ProjectModule,
    TaskModule,
    ReportModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongooseConfigFactory,
      inject: [ConfigService],
    }),
    MailerModule.forRoot({
      transport: {
        host: configService.get('MAIL_SERVICE'),
        auth: {
          user: configService.get('MAIL_USER'),
          pass: configService.get('MAIL_PASS'),
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
