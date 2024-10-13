import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SendUserTokenUseCase } from '@/application/services/user/send-user-token';
import { UserSendTokenDTO } from '@/presentation/dto/user.dto';

@Controller('user/token')
export class SendUserTokenController {
  constructor(private readonly sendUserTokenUseCase: SendUserTokenUseCase) {}

  @Post('/send')
  @HttpCode(200)
  async handle(@Body(ValidationPipe) body: UserSendTokenDTO) {
    return this.sendUserTokenUseCase.execute(body);
  }
}
