import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { EmailDTO } from '../../email.dto';
import { EmailService } from '../../email.service';

@Processor('SEND_EMAIL_QUEUE')
export class EmailConsumerService {
  constructor(private readonly emailService: EmailService) {}

  @Process('SEND_EMAIL_QUEUE')
  async execute({ data }: Job<EmailDTO>) {
    const { subject, from, template, body } = data;

    await this.emailService.sendEmail({ subject, from, template, body });
  }

  @OnQueueActive()
  onActive(job: Job<EmailDTO>) {
    console.log(`Queue Active`, job.id);
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<EmailDTO>, err: Error) {
    console.log(`Queue Failed`, job.id, err);
  }

  @OnQueueCompleted()
  async onQueueCompleted(job: Job<EmailDTO>) {
    console.log(`Queue Completed`, job.id);
  }
}
