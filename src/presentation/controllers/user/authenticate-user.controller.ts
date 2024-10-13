import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticateUserUseCase } from '@/application/services/user/authenticate-user';
import { UserAuthenticationDTO } from '@/presentation/dto/user.dto';

@Controller('user')
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post('/auth/login')
  async handle(
    @Res() response: Response,
    @Body(ValidationPipe) body: UserAuthenticationDTO,
  ) {
    return this.authenticateUserUseCase.execute(response, body);
  }
}
