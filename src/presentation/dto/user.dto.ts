import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UserDocumentTypeEnum, UserStatusEnum } from '@/common/enums/user.enum';
import { TokenTypeEnum } from '@/common/enums/token.enum';

export class UserCreationDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  birthdate?: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty()
  @IsEnum(UserDocumentTypeEnum, {
    message: 'Valid document type required',
  })
  @IsNotEmpty()
  documentType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserUpdateDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  birthdate?: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  document?: string;

  @ApiProperty()
  @IsEnum(UserDocumentTypeEnum, {
    message: 'Valid document type required',
  })
  @IsOptional()
  documentType?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  token: number;
}

export class UserUpdateStatusDTO {
  status: UserStatusEnum;
}

export class UserUpdatePasswordDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  repeatPassword: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  token: number;
}

export class UserDetailsDTO {
  id: string;
  name: string;
  lastName: string;
  email: string;
  birthdate?: Date | null;
  document: string;
  documentType: string;
  role: string;
}

export class UsersFindByEmailOrDocumentDTO {
  email?: string;
  document?: string;
}

export class UserFindByEmailDTO {
  email: string;
}

export class UserFindByEmailAndStatusDTO {
  email: string;
  status: UserStatusEnum;
}

export class UserAuthenticationDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserConfirmTokenDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  token: number;
}

export class UserSendTokenDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    enum: [
      TokenTypeEnum.CONFIRM_ACCOUNT,
      TokenTypeEnum.UPDATE_PASSWORD,
      TokenTypeEnum.UPDATE_EMAIL,
    ],
  })
  @IsEnum(TokenTypeEnum, {
    message: 'Valid type token required',
  })
  @IsNotEmpty()
  tokenType: string;
}
