import {
  Body,
  Controller,
  HttpCode,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserUpdatePasswordDTO } from '@/presentation/dto/user.dto';
import { UpdateUserPasswordUseCase } from '@/application/services/user/update-user-password';

@Controller('user')
export class UpdateUserPasswordController {
  constructor(
    private readonly updateUserPasswordUseCase: UpdateUserPasswordUseCase,
  ) {}

  @Put('/update-password')
  @HttpCode(200)
  async handle(
    @Body(ValidationPipe) body: UserUpdatePasswordDTO,
  ): Promise<void> {
    await this.updateUserPasswordUseCase.execute(body);
  }
}
