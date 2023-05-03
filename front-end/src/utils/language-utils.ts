import { Language } from "../types";

const toEnglishList = (items: Array<string>): string => {
  if (items?.length === 0) return "nothing";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, items.length - 1).join(", ")}, and ${
    items[items.length - 1]
  }`;
};

const toJapaneseList = (items: Array<string>): string => {
  if (items?.length === 0) return "何もない";
  return `${items.join("と")}`;
};

export const formatList = (
  items: Array<string>,
  language: Language
): string => {
  if (language === "en") return toEnglishList(items);
  return toJapaneseList(items);
};
