import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/guards/jwt-auth.guard';
import { RefreshUserAccessTokenUseCase } from '@/application/services/user/refresh-user-access-token';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class RefreshUserAccessTokenController {
  constructor(
    private refreshUserAccessTokenUseCase: RefreshUserAccessTokenUseCase,
  ) {}

  @Post('auth/refresh')
  @ApiBearerAuth('KEY_AUTH')
  async handle(@Res() response: Response, @Req() request: Request) {
    return this.refreshUserAccessTokenUseCase.execute(response, request);
  }
}
