export enum UserType {
  resident = 'resident',
  admin = 'admin',
}

export interface User {
  name: string;
  password: string;
  status: UserType;
  isactive: boolean;
  email: string;
  phone: string;
  voucher: number;
}
