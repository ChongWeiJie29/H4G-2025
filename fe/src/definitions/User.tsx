// Define the User type
export interface User {
  status: "resident" | "admin";
  isactive: boolean;
  name: string;
  password: string;
  email: string;
  phone: string;
  voucherAmount: number | null; // Can be null if no balance
}

