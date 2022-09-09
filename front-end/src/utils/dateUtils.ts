import moment, { Moment } from "moment";
import { APIFormattedItem, Item } from "../types";

export const viewFormattedItem = (apiItem: APIFormattedItem): Item => {
  const item: Item = {
    ...apiItem,
    expiration: apiItem.expiration ? moment(apiItem.expiration) : undefined,
    added: apiItem.added ? moment(apiItem.added) : undefined,
    amount: apiItem.amount ? parseFloat(apiItem.amount) : 1,
    quantity: apiItem.amount ? parseInt(apiItem.quantity) : 1,
  };
  return item;
};

export const apiFormattedItem = (item: Item): APIFormattedItem => {
  const apiItem: APIFormattedItem = {
    ...item,
    expiration: item.expiration?.toISOString() || undefined,
    added: item.added?.toISOString() || undefined,
    amount: item.amount?.toString() || undefined,
    quantity: item.quantity?.toString() || "1",
  };
  return apiItem;
};

export const formatDate = (date: Moment): string => {
  return date?.format("ll") || "Unknown";
};

export const formatDateTime = (date: Moment): string => {
  return date?.format("lll") || "Unknown";
};

export const formatDateInput = (date: Moment): string => {
  return date?.format("YYYY-MM-DD") || "";
};

const DateUtils = {
  viewFormattedItem,
  apiFormattedItem,
  formatDate,
  formatDateTime,
  formatDateInput,
};

export default DateUtils;
