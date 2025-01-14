export enum RequestType {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
};

export interface Transaction {
  request_id: number
  status: RequestType;
  name: string;
  product: string;
  price: number;
  quantity: number;
  request_time: Date;
  response_time: Date;
}
