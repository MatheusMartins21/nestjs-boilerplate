import { TokenTypeEnum } from '@/common/enums/token.enum';

export class TokenCreationDTO {
  receiver: string;
  expirationDate: Date;
  type: TokenTypeEnum;
  token: number;
}

export class TokenFindFirstByReceiverAndTokenTypeDTO {
  receiver: string;
  type: TokenTypeEnum;
}
