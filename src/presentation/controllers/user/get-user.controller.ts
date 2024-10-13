import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/guards/jwt-auth.guard';
import { GetUserUseCase } from '@/application/services/user/get-user';
import { UserDetailsDTO } from '@/presentation/dto/user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  @Get('/details')
  @ApiBearerAuth('KEY_AUTH')
  async handle(@Req() request: Request): Promise<UserDetailsDTO> {
    return await this.getUserUseCase.execute(request);
  }
}
