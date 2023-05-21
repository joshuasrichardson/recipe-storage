import { ObjectId } from "mongoose";
import Item, { ItemHistory } from "../models/storage";

export const addItems = async (itemAttributes: object, numItems: number) => {
  for (let i = 0; i < numItems; i += 1) {
    const item = new Item(itemAttributes);
    console.log(item);
    await item.save();
    const itemHist = new ItemHistory(itemAttributes);
    await itemHist.save();
  }
};

export const getItem = async (user: ObjectId, id: string) => {
  return await Item.findOne({
    user,
    _id: id,
  }).populate("user");
};

export const getItems = async (user: ObjectId, limit?: number) => {
  let query = Item.find({
    user,
    $or: [{ deleted: false }, { deleted: { $exists: false } }],
  })
    .sort({ expiration: 1 })
    .populate("user");
  if (limit) query = query.limit(limit);
  return await query;
};

export const updateItem = async (itemAttributes) => {
  const item = await Item.findByIdAndUpdate(
    { _id: itemAttributes.id },
    itemAttributes
  );
  item.save();
  return item;
};

export const deleteItem = async (user: ObjectId, id: string) => {
  const doc = await Item.findById(id);
  if (doc) {
    const obj = doc.toObject();
    delete obj._id;
    obj.added = new Date();
    obj.deleted = true;
    const docClone = new ItemHistory(obj);
    await docClone.save();
  }

  await Item.updateOne({ user, _id: id }, { deleted: true });
};

export const clearStorage = async (user: ObjectId) => {
  if (!user) return;
  await Item.updateMany({ user }, { deleted: true });
  await new ItemHistory({ name: "All Items", user });
};

export const getItemHistoryRecords = async (user: ObjectId, code: string) => {
  return await ItemHistory.find({ user, code }).sort({ added: -1 });
};

export const getItemHistoryRecord = async (user: ObjectId, id: string) => {
  return await ItemHistory.findOne({
    user,
    id,
  }).populate("user");
};

export const getItemHistory = async (user: ObjectId) => {
  return await ItemHistory.find({
    user,
  })
    .sort({
      added: -1,
    })
    .populate("user");
};