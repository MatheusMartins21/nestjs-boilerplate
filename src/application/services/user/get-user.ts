import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { Request } from 'express';
import { AuthService } from '@/core/auth/auth.service';
import { UserDetailsDTO } from '@/presentation/dto/user.dto';

@Injectable()
export class GetUserUseCase {
  constructor(
    private authService: AuthService,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(request: Request): Promise<UserDetailsDTO> {
    const oldRefreshToken = request.cookies.refreshToken;
    const decodedToken = this.authService.decodeRefreshToken(oldRefreshToken);
    const user = await this.userRepository.findUserById(decodedToken.sub);

    if (!user) {
      throw new NotFoundException(
        'User does not exist or not found. Please, try again.',
      );
    }

    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      birthdate: user.birthdate,
      document: user.document,
      documentType: user.documentType,
      role: user.role,
    };
  }
}
