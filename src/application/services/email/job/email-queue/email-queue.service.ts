import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EmailDTO } from '../../email.dto';

@Injectable()
export class EmailQueueService {
  constructor(@InjectQueue('SEND_EMAIL_QUEUE') private sendEmailQueue: Queue) {}

  async execute({ subject, from, template, body }: EmailDTO) {
    await this.sendEmailQueue.add('SEND_EMAIL_QUEUE', {
      subject,
      from,
      template,
      body,
    });
  }
}
