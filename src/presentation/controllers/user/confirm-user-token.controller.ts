import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ConfirmUserTokenUseCase } from '@/application/services/user/confirm-user-token';
import { UserConfirmTokenDTO } from '@/presentation/dto/user.dto';

@Controller('user')
export class ConfirmUserTokenController {
  constructor(
    private readonly confirmUserTokenUseCase: ConfirmUserTokenUseCase,
  ) {}

  @Post('/confirm-account')
  @HttpCode(200)
  async handle(@Body(ValidationPipe) body: UserConfirmTokenDTO) {
    return this.confirmUserTokenUseCase.execute(body);
  }
}
