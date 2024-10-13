import { UserUpdatePasswordDTO } from '@/presentation/dto/user.dto';
import { compareDates } from '@/common/utils/token';
import {
  BadRequestException,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import * as moment from 'moment/min/moment-with-locales';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { ITokenRepository } from '@/domain/repositories/token-repository.interface';
import { hash } from 'bcryptjs';
import { TokenTypeEnum } from '@/common/enums/token.enum';

moment.localeData();

@Injectable()
export class UpdateUserPasswordUseCase {
  constructor(
    @Inject('ITokenRepository')
    private readonly tokenRepository: ITokenRepository,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: UserUpdatePasswordDTO): Promise<void> {
    const { email, token, password, repeatPassword } = data;

    if (password !== repeatPassword) {
      throw new MethodNotAllowedException(
        'Passwords do not match. Please, try again.',
      );
    }

    const userWithEmail = await this.userRepository.findUserByEmail({
      email,
    });

    if (!userWithEmail) {
      throw new NotFoundException(
        'User does not exist or not found. Please, try again.',
      );
    }

    const userWithToken =
      await this.tokenRepository.findFirstTokenByUserIdAndTokenType({
        receiver: userWithEmail.email,
        type: TokenTypeEnum.UPDATE_PASSWORD,
      });

    if (!userWithToken) {
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
    } else {
      const hashedPassword = await hash(password, 8);

      await this.userRepository.updateUserPassword(userWithEmail.id, {
        ...data,
        password: hashedPassword,
      });
    }
  }
}
