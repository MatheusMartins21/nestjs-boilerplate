import { UserConfirmTokenDTO } from '@/presentation/dto/user.dto';
import { compareDates } from '@/common/utils/token';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as moment from 'moment/min/moment-with-locales';
import { UserStatusEnum } from '@/common/enums/user.enum';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { ITokenRepository } from '@/domain/repositories/token-repository.interface';
import { TokenTypeEnum } from '@/common/enums/token.enum';

moment.localeData();

@Injectable()
export class ConfirmUserTokenUseCase {
  constructor(
    @Inject('ITokenRepository')
    private readonly tokenRepository: ITokenRepository,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: UserConfirmTokenDTO): Promise<void> {
    const { email, token } = data;

    const userWithEmailAndStatus =
      await this.userRepository.findUserByEmailAndStatus({
        email,
        status: UserStatusEnum.PENDING,
      });

    if (!userWithEmailAndStatus) {
      throw new NotFoundException(
        'User does not exist, not found or has it already been activated.',
      );
    }

    const userWithToken =
      await this.tokenRepository.findFirstTokenByUserIdAndTokenType({
        receiver: userWithEmailAndStatus.email,
        type: TokenTypeEnum.CONFIRM_ACCOUNT,
      });

    if (!userWithToken) {
      throw new NotFoundException(
        'Token does not exist, not found or user has it already been activated.',
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
    } else {
      await this.userRepository.updateUserStatus(userWithEmailAndStatus.id, {
        status: UserStatusEnum.ACTIVE,
      });
    }
  }
}
