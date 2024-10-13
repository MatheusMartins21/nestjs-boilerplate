import { BadGatewayException, Injectable } from '@nestjs/common';
import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import {
  UserCreationDTO,
  UserFindByEmailAndStatusDTO,
  UserFindByEmailDTO,
  UsersFindByEmailOrDocumentDTO,
  UserUpdateDTO,
  UserUpdatePasswordDTO,
  UserUpdateStatusDTO,
} from '@/presentation/dto/user.dto';
import { User } from '@/domain/entities/user.entity';
import { UserStatusEnum } from '@/common/enums/user.enum';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: UserCreationDTO): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          ...data,
          status: UserStatusEnum.PENDING,
        },
      });
    } catch (error) {
      throw new BadGatewayException(
        'Failed to create user. Please, try again.',
      );
    }
  }

  async updateUser(id: string, data: UserUpdateDTO): Promise<User> {
    try {
      return await this.prisma.user.update({
        data: {
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          birthdate: data.birthdate,
          document: data.document,
          documentType: data.documentType,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadGatewayException(
        'Failed to update user. Please, try again.',
      );
    }
  }

  async updateUserStatus(id: string, data: UserUpdateStatusDTO): Promise<User> {
    try {
      return await this.prisma.user.update({
        data: {
          status: data.status,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadGatewayException(
        'Failed to update user. Please, try again.',
      );
    }
  }

  async updateUserPassword(
    id: string,
    data: UserUpdatePasswordDTO,
  ): Promise<User> {
    try {
      return await this.prisma.user.update({
        data: {
          password: data.password,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadGatewayException(
        'Failed to update user. Please, try again.',
      );
    }
  }

  async findUsersByEmailOrDocument(
    data: UsersFindByEmailOrDocumentDTO,
  ): Promise<User[]> {
    const { email, document } = data;

    try {
      return await this.prisma.user.findMany({
        where: {
          OR: [{ email }, { document }],
        },
      });
    } catch (error) {
      throw new BadGatewayException('Failed to fetch data. Please, try again.');
    }
  }

  async findUserByEmail(data: UserFindByEmailDTO): Promise<User | null> {
    const { email } = data;

    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new BadGatewayException('Failed to fetch data. Please, try again.');
    }
  }

  async findUserByEmailAndStatus(
    data: UserFindByEmailAndStatusDTO,
  ): Promise<User | null> {
    const { email, status } = data;

    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
          status,
        },
      });
    } catch (error) {
      throw new BadGatewayException('Failed to fetch data. Please, try again.');
    }
  }

  async findUserById(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadGatewayException('Failed to fetch data. Please, try again.');
    }
  }
}
