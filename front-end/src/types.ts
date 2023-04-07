import { Moment } from "moment-timezone";

export type ContextType = {
  user: User;
  setUser: (user: User) => void;
};

export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role?: string;
};

export type Item = {
  _id?: string;
  id?: string;
  user?: string;
  code: string;
  name: string;
  brand: string;
  description: string;
  container: string;
  expiration: SRDate;
  tags: string;
  amount: number | string;
  unit: string;
  src?: string;
  added?: SRDate;
  deleted?: boolean;
  quantity?: number | string;
  image?: any;
};

export type APIFormattedItem = {
  _id?: string;
  id?: string;
  user?: string;
  code: string;
  name: string;
  brand: string;
  description: string;
  container: string;
  expiration: string;
  tags: string[];
  amount: string | number;
  unit: string;
  src?: string;
  added: string;
  deleted?: boolean;
  quantity?: string | number;
  image?: any;
};

export type ItemAutofill = {
  id?: string;
  name: string;
  code?: string;
  container?: string;
  brand?: string;
  description?: string;
  amount?: number | string;
  unit?: string;
  tags?: string;
  src?: string;
};

export type Recipe = {
  _id: string;
  name: string;
  numServings?: number;
  ingredients: string[];
  steps?: string[];
  description?: string;
  link?: string;
  imageUrl?: string;
  minutes?: number;
  materials?: string[];
};

export type Attribute = {
  key: string;
  value: string[] | string;
  color?: string;
  ol?: boolean;
};

export type Size =
  | "none"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge"
  | "max";

export type Child = JSX.Element | JSX.Element[] | string;

export type SRDate = Moment;
