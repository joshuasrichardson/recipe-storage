import { Moment } from "moment-timezone";

export type ContextType = {
  user: User;
  setUser: (user: User) => void;
};

export type User = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role?: string;
};

export type Item = {
  _id?: string;
  id?: string;
  user: string;
  code: string;
  name: string;
  brand: string;
  description: string;
  container: string;
  expiration: SRDate;
  tags: string;
  amount: number;
  unit: string;
  src: string;
  added: SRDate;
  deleted: boolean;
  quantity?: number;
  image?: any;
};

export type APIFormattedItem = {
  _id?: string;
  id?: string;
  user: string;
  code: string;
  name: string;
  brand: string;
  description: string;
  container: string;
  expiration: string;
  tags: string[];
  amount: string;
  unit: string;
  src: string;
  added: string;
  deleted: boolean;
  quantity?: string;
  image?: any;
};

export type ItemAutofill = {
  id?: string;
  name: string;
  brand?: string;
  description?: string;
  amount?: number;
  unit?: string;
  tags?: string;
  src?: string;
};

export type Recipe = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role?: string;
};

export type Size =
  | "none"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "max";

export type Child = JSX.Element | JSX.Element[] | string;

export type SRDate = Moment;
