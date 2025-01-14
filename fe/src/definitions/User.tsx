// Define the User type
export interface User {
  name: string;
  password: string;
  status: "resident" | "admin";
  isactive: boolean;
  email: string;
  phone: string;
  voucher: number | null; // Can be null if no balance
  // transactions: Transaction[];
}

