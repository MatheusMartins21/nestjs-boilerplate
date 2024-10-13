import { AuthService } from '@/core/auth/auth.service';
import { UserAuthenticationDTO } from '@/presentation/dto/user.dto';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { Response } from 'express';
import { UserStatusEnum } from '@/common/enums/user.enum';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private authService: AuthService,
  ) {}

  async execute(response: Response, data: UserAuthenticationDTO) {
    const { email, password } = data;

    const user = await this.userRepository.findUserByEmail({ email });

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.');
    }

    if (user?.status !== UserStatusEnum.ACTIVE) {
      throw new ForbiddenException('User is not active.');
    }

    const isPassWordValid = await compare(password, user.password);

    if (!isPassWordValid) {
      throw new UnauthorizedException('User credentials do not match.');
    }

    const accessToken = await this.authService.createAccessToken(user.id);
    const refreshToken = await this.authService.createRefreshToken(user.id);

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
