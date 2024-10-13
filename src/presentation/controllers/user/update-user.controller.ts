import {
  Body,
  Controller,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/guards/jwt-auth.guard';
import { UserUpdateDTO } from '@/presentation/dto/user.dto';
import { UpdateUserUseCase } from '@/application/services/user/update-user';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  @Put('/update')
  @ApiBearerAuth('KEY_AUTH')
  async handle(
    @Req() request: Request,
    @Body(ValidationPipe) body: UserUpdateDTO,
  ): Promise<void> {
    return await this.updateUserUseCase.execute(request, body);
  }
}
