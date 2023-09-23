export const toListString = (
  list: Array<string>,
  conjunction: "and" | "or"
): string => {
  if (!list.length) return "";
  if (list.length === 1) return list[0];
  if (list.length === 2) return `${list[0]} ${conjunction} ${list[1]}`;
  return `${list.slice(0, list.length - 1).join(", ")}, ${conjunction} ${
    list[list.length - 1]
  }`;
};
