import { UserUpdateDTO } from '@/presentation/dto/user.dto';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as moment from 'moment/min/moment-with-locales';
import validateDocument from '@/common/utils/validateDocument';
import { UserDocumentTypeEnum } from '@/common/enums/user.enum';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { TokenTypeEnum } from '@/common/enums/token.enum';
import { compareDates } from '@/common/utils/token';
import { ITokenRepository } from '@/domain/repositories/token-repository.interface';
import { Request } from 'express';
import { AuthService } from '@/core/auth/auth.service';

moment.localeData();

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private authService: AuthService,
    @Inject('ITokenRepository')
    private readonly tokenRepository: ITokenRepository,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(request: Request, data: UserUpdateDTO): Promise<void> {
    const { email, document, documentType, token } = data;

    const oldRefreshToken = request.cookies.refreshToken;
    const decodedToken = this.authService.decodeRefreshToken(oldRefreshToken);

    if (
      document?.length &&
      !validateDocument(document, documentType as UserDocumentTypeEnum)
    ) {
      throw new BadRequestException(
        'Document format not supported. Please, try again.',
      );
    }

    const userWithSameEmailOrDocument =
      await this.userRepository.findUsersByEmailOrDocument({
        email,
        document,
      });

    if (userWithSameEmailOrDocument.length) {
      throw new ConflictException(
        'User with same e-mail or document already exists.',
      );
    }

    if (email?.length) {
      const userWithToken =
        await this.tokenRepository.findFirstTokenByUserIdAndTokenType({
          receiver: email,
          type: TokenTypeEnum.UPDATE_EMAIL,
        });

      if (!userWithToken) {
        throw new NotFoundException(
          'Token does not exist or not found. Please, try again.',
        );
      }

      if (userWithToken.receiver !== email) {
        throw new NotFoundException(
          'Token does not exist or not found. Please, try again.',
        );
      }

      const differenceInMinutes = compareDates(
        new Date(),
        userWithToken.expirationDate,
      );

      if (differenceInMinutes > 0 || token !== userWithToken.token) {
        throw new BadRequestException(
          'Token expired or invalid. Please, create a new one.',
        );
      }
    }

    await this.userRepository.updateUser(decodedToken.sub, data);
  }
}
