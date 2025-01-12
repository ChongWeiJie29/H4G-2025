import { User } from "../definitions/User";

// Mock user object
const MockUser: User = {
  status: "resident",
  isactive: true,
  name: "John Doe",
  password: "securepassword",
  email: "john.doe@example.com",
  phone: "+1234567890",
  voucherAmount: 150,
  transactions: [
    {
      id: 1,
      type: "in",
      amount: 50,
      date: "2025-01-01T10:30:00Z",
      description: "Voucher redeemed for points",
    },
    {
      id: 2,
      type: "out",
      amount: 20,
      date: "2025-01-05T14:45:00Z",
      description: "Purchased a coffee",
    },
    {
      id: 3,
      type: "in",
      amount: 100,
      date: "2025-01-10T08:15:00Z",
      description: "Added voucher balance",
    },
  ],
};

export default MockUser;
