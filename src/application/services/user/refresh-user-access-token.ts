import { AuthService } from '@/core/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RefreshUserAccessTokenUseCase {
  constructor(private authService: AuthService) {}

  async execute(response: Response, request: Request) {
    const oldRefreshToken = request.cookies.refreshToken;
    const decodedToken = this.authService.decodeRefreshToken(oldRefreshToken);

    const accessToken = await this.authService.createAccessToken(
      decodedToken.sub,
    );
    const refreshToken = await this.authService.createRefreshToken(
      decodedToken.sub,
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return response.send({
      access_token: accessToken,
    });
  }
}
