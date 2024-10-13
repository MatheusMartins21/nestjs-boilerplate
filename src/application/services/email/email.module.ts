import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { Env } from '@/env';
import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EmailQueueService } from './job/email-queue/email-queue.service';
import { EmailConsumerService } from './job/email-consumer/email-consumer.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'SEND_EMAIL_QUEUE',
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService<Env, true>) {
        const host = config.get('SMTP_HOST', { infer: true });
        const port = config.get('SMTP_PORT', { infer: true });
        const user = config.get('SMTP_USER', { infer: true });
        const pass = config.get('SMTP_PASSWORD', { infer: true });

        return {
          transport: {
            host,
            port,
            secure: true, // REMOVER AO IMPLEMENTAR SMTP
            auth: {
              user,
              pass,
            },
            // tls: {
            //   minDHSize: 512,
            //   minVersion: 'TLSv1',
            //   maxVersion: 'TLSv1.3',
            //   ciphers: 'ALL',
            //   rejectUnauthorized: false,
            // }, UTILIZAR AO IMPLEMENTAR SMTP
          },
          defaults: {
            from: '"',
          },
          template: {
            dir: join(__dirname, '/templates'),
            adapter: new PugAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [EmailService, EmailConsumerService, EmailQueueService],
  exports: [EmailQueueService],
})
export class EmailModule {}
