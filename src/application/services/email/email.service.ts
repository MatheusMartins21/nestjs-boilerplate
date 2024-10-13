import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailDTO } from './email.dto';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(data: EmailDTO) {
    const { from, subject, template, body } = data;

    const to = body?.receiver?.email || '';

    await this.mailerService.sendMail({
      to,
      from,
      subject,
      template,
      context: {
        ...body,
      },
    });
  }
}
