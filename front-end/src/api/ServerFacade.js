import axios from "axios";
import moment from "moment";
import {
  X_API_KEY,
  X_APP_KEY,
  X_RAPIDAPI_HOST,
  X_RAPIDAPI_KEY,
} from "./constants";

const login = async (username, password, onSuccess, onFailure) => {
  if (!username || !password) {
    return onFailure({
      response: { data: { message: "Must enter a username and password" } },
    });
  }
  try {
    const response = await axios.post("/api/users/login", {
      username: username,
      password: password,
    });
    onSuccess(response.data.user);
  } catch (err) {
    onFailure(err.response?.data?.message || "Unknown error occurred");
    if (!err.response) console.log(err);
  }
};

const register = async (
  username,
  password,
  password2,
  firstName,
  lastName,
  onSuccess,
  onFailure
) => {
  if (!username || !password || !firstName || !lastName) {
    return onFailure("Must enter a username, password, and name");
  } else if (password !== password2) {
    return onFailure("Passwords do not match");
  }
  try {
    const response = await axios.post("/api/users", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    });
    onSuccess(response.data.user);
  } catch (err) {
    onFailure(err.response?.data?.message || "Unknown error occurred");
    if (!err.response) console.log(err);
  }
};

const getLoggedInUser = async () => {
  const response = await axios.get("/api/users");
  return response.data.user;
};

const logout = async () => {
  await axios.delete("/api/users");
};

const getNutritionixV1Item = async (code) => {
  const data = await fetch(
    "https://nutritionix-api.p.rapidapi.com/v1_1/item?upc=" + code,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": X_RAPIDAPI_HOST,
        "x-rapidapi-key": X_RAPIDAPI_KEY,
      },
    }
  );
  let item = await data.json();
  if (item.item_name != null) {
    return {
      name: item.item_name,
      brand: item.brand_name,
      description: item.item_description,
    };
  }
};

const getNutritionixV2Item = async (code) => {
  const response = await axios.get(
    "https://trackapi.nutritionix.com/v2/search/item?upc=" + code,
    {
      headers: {
        "x-app-id": X_API_KEY,
        "x-app-key": X_APP_KEY,
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
      tags: arrayToString(item.tags),
      src: item.photo?.thumb,
      // serving_weight_grams could also be useful in some situations
    };
  }
};

const copyMissingFields = (item, detailedItem) => {
  if (!item.name) item.name = detailedItem.name;
  if (!item.brand) item.brand = detailedItem.brand;
  if (!item.description) item.description = detailedItem.description;
  if (!item.amount) item.amount = detailedItem.amount;
  if (!item.unit) item.unit = detailedItem.unit;
  if (!item.tags) item.tags = detailedItem.tags;
  if (!item.src) item.src = detailedItem.src;
  return item;
};

const getProduct = async (code) => {
  try {
    let res = await axios.get("/api/products/" + code);
    let item = res.data[0]; // TODO: handle case where the barcode isn't unique
    if (code.length === 12 && !item.src) {
      let item2 = await getNutritionixV2Item(code);
      item = copyMissingFields(item, item2);
    }
    item.tags = arrayToString(item.tags);
    return item;
  } catch (err) {
    console.log(err);
    try {
      return await getNutritionixV2Item(code);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};

const addProduct = async (item) => {
  try {
    const formData = new FormData();
    if (item.image) formData.append("image", item.image, item.image.name);
    formData.append("name", item.name);
    formData.append("code", item.code);
    formData.append("brand", item.brand);
    formData.append("description", item.description);
    formData.append("container", item.container);
    formData.append("tags", stringToArray(item.tags));
    formData.append("amount", item.amount);
    formData.append("unit", item.unit);
    formData.append("exipration", item.exipration);
    if (item.src) formData.append("src", item.src);
    const response = await axios.post("/api/products", formData);
    let data = response.data;
    return {
      message: data.message,
      product: data.product,
      state: {
        id: data.product.id,
        oldCode: data.product.code,
        oldName: data.product.name,
        oldBrand: data.product.brand,
        oldDescription: data.product.description,
        oldTags: arrayToString(data.product.tags),
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

const updateProduct = async (product) => {
  product.tags = stringToArray(product.tags);
  const response = await axios.put("/api/products/" + product.id, product);
};

const getItem = async (id) => {
  const res = await axios.get("/api/storage/" + id);
  res.data.expiration = formatDate(res.data.expiration);
  res.data.added = formatDate(res.data.added);
  return res.data;
};

const getHistoryItem = async (id) => {
  const res = await axios.get("/api/storage/history/" + id);
  res.data.expiration = formatDate(res.data.expiration);
  res.data.added = formatDate(res.data.added);
  return res.data;
};

const deleteItem = async (id) => {
  try {
    await axios.delete("/api/storage/" + id);
  } catch (error) {
    console.log(error);
  }
};

const getStorage = async (setItems) => {
  try {
    let response = await axios.get("/api/storage/");
    response.data.forEach(
      (item) => (item.expiration = formatDate(item.expiration))
    );
    setItems(response.data);
  } catch (error) {
    console.log(error);
    setItems([]);
  }
};

const getStorageHistory = async (setItems) => {
  try {
    let response = await axios.get("/api/storage/history");
    response.data.forEach(
      (item) => (item.expiration = formatDate(item.expiration))
    );
    response.data.forEach((item) => (item.added = formatDateTime(item.added)));
    setItems(response.data);
  } catch (error) {
    console.log(error);
    setItems([]);
  }
};

const addFoodStorage = async (userId, item) => {
  if (item.name === "") {
    console.log("Nothing to add");
    return;
  }
  try {
    const response = await axios.post("/api/storage", {
      user: userId,
      barcode: item.code,
      name: item.name,
      brand: item.brand,
      description: item.description,
      container: item.container,
      expiration: item.expiration,
      tags: stringToArray(item.tags),
      amount: item.amount,
      unit: item.unit,
      quantity: item.quantity,
      src: item.src,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateItem = async (item) => {
  item.tags = stringToArray(item.tags);
  const response = await axios.put("/api/storage/" + item.id, item);
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

const getEdamamRecipes = async (itemName, setItems) => {
  await fetch(
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
      itemName +
      "&app_id=3a833dd2&app_key=688beca46c7ed7483c41a629c1c183a3"
  )
    .then((data) => data.json())
    .then((response) => setItems(response.hits.map((hit) => hit.recipe)));
};

const getRecipes = async (itemName, setItems) => {
  try {
    let response = await axios.get("/api/recipes/" + itemName);
    setItems(response.data);
    // This function will work if we call getEdamamRecipes(itemName, setItems),
    // but I don't want to go over the free limit.
  } catch (error) {
    console.log(error);
    setItems([]);
  }
};

const formatDate = (date) => {
  if (date == null) return "Unknown";
  return moment(date).format("D MMM YYYY");
};

const formatDateTime = (datetime) => {
  if (datetime == null) return "Unknown";
  return moment(datetime).format("D MMM YYYY LT");
};

const stringToArray = (string) => {
  if (!string || !string.length) return [];
  if (!string.includes(",")) return [string];
  return string.split(",").map((t) => t.trim());
};

const arrayToString = (array) => {
  if (!array) return "";
  return array.join(", ");
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
};

export default ServerFacade;
