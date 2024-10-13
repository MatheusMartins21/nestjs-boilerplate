export class User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  birthdate?: Date | null;
  document: string;
  documentType: string;
  password: string;
  status: string;
  role: string;
  createdAt: Date;
  updatedAt?: Date | null;
}
