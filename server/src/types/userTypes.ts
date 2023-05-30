export interface User {
  id?: any;
  email: string;
  username: string;
  token?: string;
  profile?: string;
}

export interface Signup {
  username: string;
  email: string;
  password?: string;
  date?: number;
}

export interface Verificationpayload {
  email: string;
  _id: any;
}

export interface Follow {
  id: string;
  name: string;
  email: string;
  profile: string | null;
}
