import { IAccount } from "./account";
import { IBank } from "./bank";

export interface IRecipient {
  _id: string;
  name: string;
  rut: string;
  email: string;
  phone: number;
  bank: string;
  account: number;
  accountType: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
