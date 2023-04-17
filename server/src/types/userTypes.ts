import { ObjectId } from "mongoose";

export interface User {
  email: string;
  username: string;
  token?: string;
}

export interface Signup {
  username: string;
  email: string;
  password?: string;
}

export interface Verificationpayload {
  email: string;
  _id: any;
}
