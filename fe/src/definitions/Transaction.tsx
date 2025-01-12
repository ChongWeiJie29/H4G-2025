export interface Transaction {
  id: number;
  type: "in" | "out"; // "in" for incoming, "out" for outgoing
  amount: number;
  date: string; // Transaction date as a string (e.g., ISO 8601 format)
  description: string;
}
