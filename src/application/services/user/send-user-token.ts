import { UserSendTokenDTO } from '@/presentation/dto/user.dto';
import { EmailQueueService } from '@/application/services/email/job/email-queue/email-queue.service';
import {
  EXPIRATION_MINUTE,
  generateToken,
  tokenTypeText,
} from '@/common/utils/token';
import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment/min/moment-with-locales';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { ITokenRepository } from '@/domain/repositories/token-repository.interface';
import { TokenTypeEnum } from '@/common/enums/token.enum';

moment.localeData();

@Injectable()
export class SendUserTokenUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('ITokenRepository')
    private readonly tokenRepository: ITokenRepository,
    private emailQueueService: EmailQueueService,
  ) {}

  async execute(data: UserSendTokenDTO): Promise<void> {
    const { email, tokenType } = data;

    const user = await this.userRepository.findUserByEmail({ email });

    if (
      (tokenType as TokenTypeEnum) === TokenTypeEnum.UPDATE_PASSWORD ||
      (tokenType as TokenTypeEnum) === TokenTypeEnum.CONFIRM_ACCOUNT
    ) {
      if (!user) {
        throw new BadGatewayException(
          'User not found or not exists. Please, try again.',
        );
      }
    }

    const userToken = await this.tokenRepository.createToken({
      receiver: email,
      expirationDate: moment(new Date()).add(EXPIRATION_MINUTE, 'm').toDate(),
      type: tokenType as TokenTypeEnum,
      token: generateToken(),
    });

    if (!userToken) {
      throw new BadGatewayException(
        'Failed to create token. Please, try again.',
      );
    }

    await this.emailQueueService.execute({
      subject: `Token de ${tokenTypeText(tokenType as TokenTypeEnum)}.`,
      from: 'Boilerplate" <boilerplate@gmail.com>',
      template: 'confirm_user',
      body: {
        title: `Este é seu Token para ${tokenTypeText(tokenType as TokenTypeEnum)}`,
        receiver: {
          name: user?.name || '',
          email,
        },
        optionals: {
          token: userToken.token,
        },
      },
    });
  }
}
