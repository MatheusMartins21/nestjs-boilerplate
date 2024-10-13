import { Token } from '@/domain/entities/token.entity';
import {
  TokenCreationDTO,
  TokenFindFirstByReceiverAndTokenTypeDTO,
} from '@/presentation/dto/token.dto';

export interface ITokenRepository {
  createToken(data: TokenCreationDTO): Promise<Token>;
  findFirstTokenByUserIdAndTokenType(
    data: TokenFindFirstByReceiverAndTokenTypeDTO,
  ): Promise<Token | null>;
}
