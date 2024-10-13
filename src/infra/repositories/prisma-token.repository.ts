import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ITokenRepository } from '@/domain/repositories/token-repository.interface';
import {
  TokenCreationDTO,
  TokenFindFirstByReceiverAndTokenTypeDTO,
} from '@/presentation/dto/token.dto';
import { Token } from '@/domain/entities/token.entity';

@Injectable()
export class PrismaTokenRepository implements ITokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createToken(data: TokenCreationDTO): Promise<Token> {
    try {
      return await this.prisma.token.create({
        data,
      });
    } catch (error) {
      throw new BadGatewayException(
        'Failed to create token. Please, try again.',
      );
    }
  }

  async findFirstTokenByUserIdAndTokenType(
    data: TokenFindFirstByReceiverAndTokenTypeDTO,
  ): Promise<Token | null> {
    const { receiver, type } = data;

    try {
      return await this.prisma.token.findFirst({
        where: {
          receiver,
          type,
        },
        orderBy: {
          expirationDate: 'desc',
        },
      });
    } catch (error) {
      throw new BadGatewayException('Failed to fetch data. Please, try again');
    }
  }
}
