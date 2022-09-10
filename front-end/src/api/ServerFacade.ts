import axios, { AxiosResponse } from "axios";
import { APIFormattedItem, Item, ItemAutofill, User } from "../types";
// @ts-ignore
import { apiFormattedItem, viewFormattedItem } from "../utils/utils.ts";

export type LoginParams = {
  username: string;
  password: string;
  onSuccess: (user: User) => any;
  onFailure: (err: string) => any;
};

type LoginRequest = {
  username: string;
  password: string;
};

const login = async ({
  username,
  password,
  onSuccess,
  onFailure,
}: LoginParams): Promise<void> => {
  if (!username || !password) {
    return onFailure("Must enter a username and password");
  }
  try {
    const response: AxiosResponse<{ user: User }, LoginRequest> =
      await axios.post("/api/users/login", {
        username,
        password,
      });
    onSuccess(response.data.user);
  } catch (err: any) {
    onFailure(err.response?.data?.message || "Unknown error occurred");
    if (!err.response) console.log(err);
  }
};

export type RegisterParams = {
  username: string;
  password: string;
  password2: string;
  firstName: string;
  lastName: string;
  onSuccess: (user: User) => any;
  onFailure: (err: string) => any;
};

type RegisterRequest = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

const register = async ({
  username,
  password,
  password2,
  firstName,
  lastName,
  onSuccess,
  onFailure,
}: RegisterParams): Promise<void> => {
  if (!username || !password || !firstName || !lastName) {
    return onFailure("Must enter a username, password, and name");
  } else if (password !== password2) {
    return onFailure("Passwords do not match");
  }
  try {
    const response: AxiosResponse<{ user: User }, RegisterRequest> =
      await axios.post("/api/users", {
        firstName,
        lastName,
        username,
        password,
      });
    onSuccess(response.data.user);
  } catch (err) {
    onFailure(err.response?.data?.message || "Unknown error occurred");
    if (!err.response) console.log(err);
  }
};

const getLoggedInUser = async (): Promise<User> => {
  try {
    const response: AxiosResponse<{ user: User }, any> = await axios.get(
      "/api/users"
    );
    return response.data.user;
  } catch (err) {
    return null;
  }
};

const logout = async (): Promise<void> => {
  await axios.delete("/api/users");
};

// const getNutritionixV1Item = async (code: string) => {
//   const data = await fetch(
//     "https://nutritionix-api.p.rapidapi.com/v1_1/item?upc=" + code,
//     {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": keys.X_RAPIDAPI_HOST,
//         "x-rapidapi-key": keys.X_RAPIDAPI_KEY,
//       },
//     }
//   );
//   let item = await data.json();
//   if (item.item_name != null) {
//     return {
//       name: item.item_name,
//       brand: item.brand_name,
//       description: item.item_description,
//     };
//   }
// };

type APIKeychain = {
  X_API_KEY: string;
  X_APP_KEY: string;
};

const getNutritionixV2Item = async (code: string): Promise<ItemAutofill> => {
  let keys: APIKeychain;
  // @ts-ignore
  return import("./constants.ts")
    .then(async (data) => {
      keys = data.keys;
      const response = await axios.get(
        "https://trackapi.nutritionix.com/v2/search/item?upc=" + code,
        {
          headers: {
            "x-app-id": keys.X_API_KEY,
            "x-app-key": keys.X_APP_KEY,
          },
        }
      );
      const item = response.data.foods[0];
      if (item.food_name != null) {
        return {
          name: item.food_name,
          brand: item.brand_name,
          description: item.nf_ingredient_statement?.toLowerCase(),
          unit: "Grams",
          tags: item.tags,
          src: item.photo?.thumb,
          // serving_weight_grams could also be useful in some situations
        };
      }
    })
    .catch((err) => {
      console.log(err);
      console.log(
        "./constants.ts has not been added to github because it contains private information."
      );
      console.log(
        "If you need access to it (you are working with the owner), please contact the owner directly"
      );
    });
};

const copyMissingFields = (
  item: ItemAutofill,
  detailedItem: ItemAutofill
): ItemAutofill => {
  if (!item.name) item.name = detailedItem.name;
  if (!item.brand) item.brand = detailedItem.brand;
  if (!item.description) item.description = detailedItem.description;
  if (!item.amount) item.amount = detailedItem.amount;
  if (!item.unit) item.unit = detailedItem.unit;
  if (!item.tags) item.tags = detailedItem.tags;
  if (!item.src) item.src = detailedItem.src;
  return item;
};

const getProduct = async (code: string): Promise<ItemAutofill> => {
  // TODO: Move more logic to the backend
  let res: AxiosResponse<ItemAutofill>;
  let item: ItemAutofill;
  let item2: ItemAutofill;

  try {
    res = await axios.get("/api/products/" + code);
    item = viewFormattedItem(res.data[0]); // TODO: handle case where the barcode isn't unique
    if (code?.length === 12 && !item.src) {
      item2 = await getNutritionixV2Item(code);
      item = copyMissingFields(item, item2);
    }

    return item;
  } catch (err) {
    try {
      console.log(err);
      if (item) return viewFormattedItem(item);
      return await getNutritionixV2Item(code);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};

const addProduct = async (item: Item) => {
  try {
    const apiItem: APIFormattedItem = apiFormattedItem(
      item
    ) as APIFormattedItem;
    const formData = new FormData();
    if (apiItem.image) {
      formData.append("image", apiItem.image, apiItem.image.name);
    }
    formData.append("name", apiItem.name);
    formData.append("code", apiItem.code);
    formData.append("brand", apiItem.brand);
    formData.append("description", apiItem.description);
    formData.append("container", apiItem.container);
    // @ts-ignore
    formData.append("tags", apiItem.tags);
    formData.append("amount", apiItem.amount);
    formData.append("unit", apiItem.unit);
    formData.append("exipration", apiItem.expiration);
    if (apiItem.src) formData.append("src", apiItem.src);
    const response = await axios.post("/api/products", formData);
    let data = response.data;
    return {
      message: data.message,
      product: data.product,
      state: {
        id: data.product._id,
        oldCode: data.product.code,
        oldName: data.product.name,
        oldBrand: data.product.brand,
        oldDescription: data.product.description,
        oldTags: data.product.tags,
        oldAmount: data.product.amount,
        oldUnit: data.product.unit,
        oldContainer: data.product.container,
        newCode: item.code,
        newName: item.name,
        newBrand: item.brand,
        newDescription: item.description,
        newTags: item.tags,
        newAmount: item.amount,
        newUnit: item.unit,
        newContainer: item.container,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (product: ItemAutofill): Promise<void> => {
  await axios.put("/api/products/" + product.id, product);
};

const getItem = async (id: string): Promise<Item> => {
  const res: AxiosResponse<any, any> = await axios.get("/api/storage/" + id);
  const item = viewFormattedItem(res.data);
  return item;
};

const getHistoryItem = async (id: string): Promise<Item> => {
  const res = await axios.get("/api/storage/history/" + id);
  const item = viewFormattedItem(res.data);
  return item;
};

const deleteItem = async (id: string): Promise<void> => {
  try {
    await axios.delete("/api/storage/" + id);
  } catch (error) {
    console.log(error);
  }
};

const getStorage = async (setItems: (items: Item[]) => void): Promise<void> => {
  try {
    let response: AxiosResponse<any, any> = await axios.get("/api/storage/");
    const apiItems: APIFormattedItem[] = response.data;
    const items: Item[] = apiItems.map((item: APIFormattedItem) =>
      viewFormattedItem(item)
    );
    setItems(items);
  } catch (error) {
    console.log(error);
    setItems([]);
  }
};

const getStorageHistory = async (
  setItems: (items: Item[]) => void
): Promise<void> => {
  try {
    let response: AxiosResponse<any, any> = await axios.get(
      "/api/storage/history"
    );
    const apiItems: APIFormattedItem[] = response.data;
    const items: Item[] = apiItems.map((item: APIFormattedItem) =>
      viewFormattedItem(item)
    );
    setItems(items);
  } catch (error) {
    console.log(error);
    setItems([]);
  }
};

const addFoodStorage = async (userId: string, item: Item): Promise<void> => {
  if (item.name === "") {
    console.log("Nothing to add");
    return;
  }
  try {
    await axios.post("/api/storage", {
      user: userId,
      ...apiFormattedItem(item),
    });
  } catch (error) {
    console.log(error);
  }
};

const updateItem = async (item: Item): Promise<void> => {
  await axios.put("/api/storage/" + item.id, apiFormattedItem(item));
};

const getContainers = async (setContainers) => {
  try {
    const response = await axios.get("/api/containers");
    setContainers(response.data[0].containers);
  } catch (error) {
    console.log(error);
    setContainers([]);
  }
};

const addContainer = async (container) => {
  if (!container || container === "") return;
  await axios.put("/api/containers", { container: container });
};

// const getEdamamRecipes = async (itemName, setItems) => {
//   await fetch(
//     "https://api.edamam.com/api/recipes/v2?type=public&q=" +
//       itemName +
//       "&app_id=3a833dd2&app_key=688beca46c7ed7483c41a629c1c183a3"
//   )
//     .then((data) => data.json())
//     .then((response) => setItems(response.hits.map((hit) => hit.recipe)));
// };

const getRecipes = async (itemName: string): Promise<any> => {
  try {
    let response = await axios.get("/api/recipes/" + itemName);
    return response.data;
    // This function will work if we call getEdamamRecipes(itemName, setItems),
    // but I don't want to go over the free limit.
  } catch (error) {
    console.log(error);
    return [];
  }
};

export type AddRecipeParams = {
  userId: string;
  name: string;
  description: string;
  ingredients: string;
  steps: string;
  numServings: string;
  link: string;
};

const addRecipe = async (addRecipeParams: AddRecipeParams): Promise<void> => {
  const response: AxiosResponse<any, AddRecipeParams> = await axios.post(
    "/api/recipes",
    addRecipeParams
  );
  console.log(response);
};

const ServerFacade = {
  login,
  register,
  getLoggedInUser,
  logout,
  getProduct,
  addProduct,
  updateProduct,
  getItem,
  getHistoryItem,
  deleteItem,
  getStorage,
  getStorageHistory,
  addFoodStorage,
  updateItem,
  getContainers,
  addContainer,
  getRecipes,
  addRecipe,
};

export default ServerFacade;
