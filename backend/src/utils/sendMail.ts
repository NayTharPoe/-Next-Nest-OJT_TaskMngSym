import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';

const configService = new ConfigService();

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(email: string, subject: string, text: string): void {
    this.mailerService.sendMail({
      to: email,
      from: configService.get('MAIL_USER'),
      subject,
      html: text,
    });
  }
}
