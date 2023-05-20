import Item, { ItemHistory } from "../models/storage";

export const addItems = async (itemAttributes: object, numItems: number) => {
  for (let i = 0; i < numItems; i += 1) {
    const item = new Item(itemAttributes);
    await item.save();
    const itemHist = new ItemHistory(itemAttributes);
    await itemHist.save();
  }
};

export const getItem = async (user: string, id: string) => {
  return await Item.findOne({
    user,
    _id: id,
  }).populate("user");
};

export const getItems = async (user: string, limit?: number) => {
  let query = Item.find({ user }).sort({ expiration: 1 }).populate("user");
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

export const deleteItem = async (user: string, id: string) => {
  const doc = await Item.findById(id);
  if (doc) {
    const obj = doc.toObject();
    delete obj._id;
    obj.added = Date.now();
    obj.deleted = true;
    const docClone = new ItemHistory(obj);
    await docClone.save();
  }

  await Item.deleteOne({ user, _id: id });
};

export const getItemHistoryRecords = async (user: string, code: string) => {
  return await ItemHistory.find({ user, code }).sort({ added: -1 });
};

export const getItemHistoryRecord = async (user: string, id: string) => {
  return await ItemHistory.findOne({
    user,
    id,
  }).populate("user");
};

export const getItemHistory = async (user: string) => {
  return await ItemHistory.find({
    user,
  })
    .sort({
      added: -1,
    })
    .populate("user");
};
