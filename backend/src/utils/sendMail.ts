import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendMail(email: string, subject: string, text: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_SERVICE'),
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
    });
    try {
      await transporter.sendMail({
        to: email,
        from: this.configService.get('MAIL_USER'),
        subject,
        html: text,
      });
    } catch (error) {
      throw error;
    }
  }
}
