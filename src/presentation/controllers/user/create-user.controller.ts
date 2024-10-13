import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserUseCase } from '@/application/services/user/create-user';
import { SendUserTokenUseCase } from '@/application/services/user/send-user-token';
import { UserCreationDTO } from '@/presentation/dto/user.dto';
import { TokenTypeEnum } from '@/common/enums/token.enum';

@Controller('user')
export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private sendUserTokenUseCase: SendUserTokenUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(ValidationPipe) body: UserCreationDTO) {
    const createdUser = await this.createUserUseCase.execute(body);
    await this.sendUserTokenUseCase.execute({
      email: createdUser.email,
      tokenType: TokenTypeEnum.CONFIRM_ACCOUNT,
    });
  }
}
