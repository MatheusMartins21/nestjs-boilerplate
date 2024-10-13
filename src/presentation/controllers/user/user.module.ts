import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user.controller';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { CreateUserUseCase } from '@/application/services/user/create-user';
import { AuthenticateUserUseCase } from '@/application/services/user/authenticate-user';
import { AuthenticateUserController } from './authenticate-user.controller';
import { RefreshUserAccessTokenController } from './refresh-user-access-token.controller';
import { RefreshUserAccessTokenUseCase } from '@/application/services/user/refresh-user-access-token';
import { AuthService } from '@/core/auth/auth.service';
import { EmailModule } from '@/application/services/email/email.module';
import { ConfirmUserTokenController } from './confirm-user-token.controller';
import { ConfirmUserTokenUseCase } from '@/application/services/user/confirm-user-token';
import { SendUserTokenController } from './send-user-token.controller';
import { SendUserTokenUseCase } from '@/application/services/user/send-user-token';
import { PrismaUserRepository } from '@/infra/repositories/prisma-user.repository';
import { PrismaTokenRepository } from '@/infra/repositories/prisma-token.repository';
import { GetUserUseCase } from '@/application/services/user/get-user';
import { GetUserController } from '@/presentation/controllers/user/get-user.controller';
import { UpdateUserPasswordController } from '@/presentation/controllers/user/update-user-password.controller';
import { UpdateUserPasswordUseCase } from '@/application/services/user/update-user-password';
import { UpdateUserController } from '@/presentation/controllers/user/update-user.controller';
import { UpdateUserUseCase } from '@/application/services/user/update-user';

@Module({
  imports: [EmailModule],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    RefreshUserAccessTokenController,
    ConfirmUserTokenController,
    SendUserTokenController,
    GetUserController,
    UpdateUserPasswordController,
    UpdateUserController,
  ],
  providers: [
    PrismaService,
    AuthService,
    CreateUserUseCase,
    AuthenticateUserUseCase,
    RefreshUserAccessTokenUseCase,
    ConfirmUserTokenUseCase,
    SendUserTokenUseCase,
    GetUserUseCase,
    UpdateUserPasswordUseCase,
    UpdateUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
    {
      provide: 'ITokenRepository',
      useClass: PrismaTokenRepository,
    },
  ],
})
export class UserModule {}
