import moment, { Moment } from "moment";
import { APIFormattedItem, Item } from "../types";

export const viewFormattedItem = (apiItem: APIFormattedItem): Item => {
  const item: Item = {
    ...apiItem,
    expiration: apiItem.expiration ? moment(apiItem.expiration) : undefined,
    added: apiItem.added ? moment(apiItem.added) : undefined,
    amount: apiItem.amount ? parseInt(apiItem.amount) : undefined,
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
  return date?.format("LL") || "Unknown";
};

export const formatDateInput = (date: Moment): string => {
  return date?.format("YYYY-MM-DD") || "";
};
