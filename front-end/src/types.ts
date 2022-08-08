export type User = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role?: string;
};

export type Item = {
  user: string;
  code: string;
  name: string;
  brand: string;
  description: string;
  container: string;
  expiration: Date;
  tags: Array<string> | string;
  amount: number;
  unit: string;
  src: string;
  added: Date;
  deleted: boolean;
};

export type Recipe = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role?: string;
};
