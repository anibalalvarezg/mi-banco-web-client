export interface ITrasnfer {
  _id: string;
  name: string;
  rut: string;
  bank: string;
  accountType: string;
  amount: number;
  userId: string;
  recipientId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
