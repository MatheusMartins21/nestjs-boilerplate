import * as moment from 'moment';
import { TokenTypeEnum } from '@/common/enums/token.enum';

export const EXPIRATION_MINUTE: number = 5;

export const TOKEN_TYPE_STRINGS = [
  {
    type: TokenTypeEnum.CONFIRM_ACCOUNT,
    string: 'Confirmar Conta',
  },
  {
    type: TokenTypeEnum.UPDATE_PASSWORD,
    string: 'Alterar Senha',
  },
  {
    type: TokenTypeEnum.UPDATE_EMAIL,
    string: 'Alterar Email',
  },
];

export function generateToken(): number {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function compareDates(firstDate: Date, secondDate: Date): number {
  const firstMomentDate = moment(firstDate);
  const secondMomentDate = moment(secondDate);

  return firstMomentDate.diff(secondMomentDate, 'minutes');
}

export function tokenTypeText(tokenType: TokenTypeEnum): string {
  const tokenText = TOKEN_TYPE_STRINGS.find((x) => x.type === tokenType);

  if (!tokenText) {
    return 'Type not found.';
  }

  return tokenText.string;
}
