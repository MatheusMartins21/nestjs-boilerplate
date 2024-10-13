import { UserDocumentTypeEnum } from '@/common/enums/user.enum';

export default function validateDocument(
  document: string,
  type: UserDocumentTypeEnum,
): boolean {
  const isValidCpf = (cpf: string) => {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    const calcCheckDigit = (base: string, factor: number) => {
      let total = 0;
      for (let i = 0; i < base.length; i++) {
        total += parseInt(base[i]) * factor--;
      }
      return total % 11 < 2 ? 0 : 11 - (total % 11);
    };

    const base = cpf.slice(0, 9);
    const checkDigits = cpf.slice(9);

    const digit1 = calcCheckDigit(base, 10);
    const digit2 = calcCheckDigit(base + digit1, 11);

    return checkDigits === `${digit1}${digit2}`;
  };

  const isValidCnpj = (cnpj: string) => {
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

    const calcCheckDigit = (base: string, factors: number[]) => {
      let total = 0;
      for (let i = 0; i < base.length; i++) {
        total += parseInt(base[i]) * factors[i];
      }
      return total % 11 < 2 ? 0 : 11 - (total % 11);
    };

    const base = cnpj.slice(0, 12);
    const checkDigits = cnpj.slice(12);
    const factors1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const factors2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const digit1 = calcCheckDigit(base, factors1);
    const digit2 = calcCheckDigit(base + digit1, factors2);

    return checkDigits === `${digit1}${digit2}`;
  };

  if (type === 'cpf' && document.length === 11) {
    return isValidCpf(document);
  } else if (type === 'cnpj' && document.length === 14) {
    return isValidCnpj(document);
  }

  return false;
}
