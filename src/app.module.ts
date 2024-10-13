import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { envSchema } from './env';
import { AuthModule } from '@/core/auth/auth.module';
import { UserModule } from '@/presentation/controllers/user/user.module';
import { EmailModule } from '@/application/services/email/email.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    EmailModule,
    UserModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
