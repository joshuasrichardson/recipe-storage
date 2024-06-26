import moment from "moment-timezone";
import { APIFormattedItem, Item, SRDate } from "../types";

export const viewFormattedItem = (apiItem: APIFormattedItem): Item => {
  const item: Item = {
    ...apiItem,
    tags: arrayToString(apiItem.tags || []),
    expiration: apiItem.expiration ? srDate(apiItem.expiration) : undefined,
    added: apiItem.added ? srDate(apiItem.added) : undefined,
    amount: apiItem.amount ? parseFloat(apiItem.amount as string) : 1,
    quantity: apiItem.amount ? parseInt(apiItem.quantity as string) : 1,
  };
  return item;
};

export const apiFormattedItem = (item: Item): APIFormattedItem => {
  const apiItem: APIFormattedItem = {
    ...item,
    tags: stringToArray(item.tags),
    expiration: item.expiration?.toISOString() || undefined,
    added: item.added?.toISOString() || undefined,
    amount: item.amount?.toString() || undefined,
    quantity: item.quantity?.toString() || "1",
  };
  return apiItem;
};

export const formatDate = (date?: SRDate): string => {
  return date?.format("ll") || "Unknown";
};

export const formatDateTime = (date?: SRDate): string => {
  return date?.format("lll") || "Unknown";
};

export const formatDateInput = (date?: SRDate): string => {
  return date?.format("YYYY-MM-DD") || "";
};

export const stringToArray = (str: string): string[] => {
  if (!str) return undefined;
  return str.split(",").map((substr) => substr.trim());
};

export const arrayToString = (obj: object): string => {
  const arr = obj as Array<string>;
  if (!arr || !arr.length) return undefined;
  return arr.join(", ");
};

export const srDate = (dateString?: string, timezone?: string): SRDate => {
  if (!dateString) dateString = moment.tz().toISOString();
  if (!timezone) timezone = moment.tz.guess();
  return moment.tz(dateString, timezone);
};

export const getNextNDates = (numDates: number): SRDate[] => {
  return Array.from({ length: numDates }, (_, day) =>
    srDate().add(day, "days")
  );
};

export const getNDates = (startDate: SRDate, numDates: number): SRDate[] => {
  return Array.from({ length: numDates }, (_, day) =>
    srDate(startDate.toISOString()).add(day, "days")
  );
};

export const isSameDay = (date1: SRDate, date2: SRDate): boolean => {
  return moment(date1).isSame(date2, "day");
};

const Utils = {
  viewFormattedItem,
  apiFormattedItem,
  formatDate,
  formatDateTime,
  formatDateInput,
  stringToArray,
  arrayToString,
  isSameDay,
};

export default Utils;
