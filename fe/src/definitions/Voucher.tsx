export enum VoucherType {
    pending = 'pending',
    accepted = 'accepted',
    rejected = 'rejected',
  }

export interface Voucher {
  voucher_id: number
  name: string;
  amount: number;
  task: string;
  status: VoucherType;
  request_time: Date;
  response_time: Date;
}