import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async createAccessToken(sub: string) {
    return this.jwt.sign({ sub }, { expiresIn: '1h' });
  }

  async createRefreshToken(sub: string) {
    return this.jwt.sign({ sub }, { expiresIn: '1d' });
  }

  decodeRefreshToken(token: string) {
    try {
      return this.jwt.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token.');
    }
  }
}
