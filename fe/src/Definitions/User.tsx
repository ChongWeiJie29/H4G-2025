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

// Mock user object
const MockUser: User = {
  status: "resident",
  isactive: true,
  name: "John Doe",
  password: "securepassword",
  email: "john.doe@example.com",
  phone: "+1234567890",
  voucherAmount: 150,
};

export default MockUser;

