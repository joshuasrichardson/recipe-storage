import { APIFormattedItem, Item } from "../../types";
import Utils, { srDate } from "../utils";

const str = "a, list, of tags";
const arr = ["a", "list", "of tags"];
const dateString = "2023-01-02T00:00:00.000Z";
const date = srDate("2023-01-02", "UTC/Etc");

const apiItem: APIFormattedItem = {
  user: "Joshua",
  code: "4011",
  name: "bananas",
  brand: "Dole",
  description: "so good",
  container: "Shelf",
  expiration: dateString,
  tags: ["fruit", "kudamono"],
  amount: "1.3",
  unit: "bananas",
  src: "bananas.com/banana.jpg",
  added: dateString,
  deleted: false,
  quantity: "1",
};

const viewItem: Item = {
  user: "Joshua",
  code: "4011",
  name: "bananas",
  brand: "Dole",
  description: "so good",
  container: "Shelf",
  expiration: date,
  tags: "fruit, kudamono",
  amount: 1.3,
  unit: "bananas",
  src: "bananas.com/banana.jpg",
  added: date,
  deleted: false,
  quantity: 1,
};

describe("utils", () => {
  it("converts api items to view items", () => {
    const item = Utils.viewFormattedItem(apiItem);
    expect(item.user).toEqual(viewItem.user);
    expect(item.code).toEqual(viewItem.code);
    expect(item.name).toEqual(viewItem.name);
    expect(item.brand).toEqual(viewItem.brand);
    expect(item.description).toEqual(viewItem.description);
    expect(item.container).toEqual(viewItem.container);
    expect(item.expiration.toISOString()).toEqual(
      viewItem.expiration.toISOString()
    );
    expect(item.tags).toEqual(viewItem.tags);
    expect(item.amount).toEqual(viewItem.amount);
    expect(item.unit).toEqual(viewItem.unit);
    expect(item.src).toEqual(viewItem.src);
    expect(item.added.toISOString()).toEqual(viewItem.added.toISOString());
    expect(item.deleted).toEqual(viewItem.deleted);
    expect(item.quantity).toEqual(viewItem.quantity);
  });

  it("converts view items to api items", () => {
    const item = Utils.apiFormattedItem(viewItem);
    expect(item).toEqual(apiItem);
  });

  it("converts string to array when string is is not empty", () => {
    expect(Utils.stringToArray(str)).toEqual(arr);
  });

  it("converts string to undefined when string is is empty", () => {
    expect(Utils.stringToArray(null)).toEqual(undefined);
    expect(Utils.stringToArray("")).toEqual(undefined);
  });

  it("converts array to string when array is is not empty", () => {
    expect(Utils.arrayToString(arr)).toEqual(str);
  });

  it("converts array to undefined when array is is empty", () => {
    expect(Utils.arrayToString(null)).toEqual(undefined);
    expect(Utils.arrayToString([])).toEqual(undefined);
  });

  it("formats dates", () => {
    expect(Utils.formatDate(date)).toEqual("Jan 2, 2023");
  });

  it("formats date times", () => {
    expect(Utils.formatDateTime(date)).toEqual("Jan 2, 2023 12:00 AM");
  });

  it("formats date input", () => {
    expect(Utils.formatDateInput(date)).toEqual("2023-01-02");
  });
});
