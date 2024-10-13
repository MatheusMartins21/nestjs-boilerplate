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

export interface IUserRepository {
  createUser(data: UserCreationDTO): Promise<User>;
  updateUser(id: string, data: UserUpdateDTO): Promise<User>;
  updateUserStatus(id: string, data: UserUpdateStatusDTO): Promise<User>;
  updateUserPassword(id: string, data: UserUpdatePasswordDTO): Promise<User>;
  findUsersByEmailOrDocument(
    data: UsersFindByEmailOrDocumentDTO,
  ): Promise<User[]>;
  findUserByEmail(data: UserFindByEmailDTO): Promise<User | null>;
  findUserByEmailAndStatus(
    data: UserFindByEmailAndStatusDTO,
  ): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
}
