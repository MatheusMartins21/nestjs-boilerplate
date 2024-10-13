import { UserCreationDTO } from '@/presentation/dto/user.dto';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import * as moment from 'moment/min/moment-with-locales';
import validateDocument from '@/common/utils/validateDocument';
import { UserDocumentTypeEnum } from '@/common/enums/user.enum';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { User } from '@/domain/entities/user.entity';
import { PASSWORD_LENGTH } from '@/common/utils/password';

moment.localeData();

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: UserCreationDTO): Promise<User> {
    const { email, document, documentType, password } = data;

    if (password.length < PASSWORD_LENGTH) {
      throw new BadRequestException(
        `Password below ${PASSWORD_LENGTH} characters. Please, try again.`,
      );
    }

    if (!validateDocument(document, documentType as UserDocumentTypeEnum)) {
      throw new BadRequestException(
        'Document format not supported. Please, try again.',
      );
    }

    const userWithSameEmailOrDocument =
      await this.userRepository.findUsersByEmailOrDocument({ email, document });

    if (userWithSameEmailOrDocument.length) {
      throw new ConflictException(
        'User with same e-mail or document already exists.',
      );
    }

    const hashedPassword = await hash(password, 8);

    return await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  }
}
