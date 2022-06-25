import axios from "axios";
import moment from "moment";

const login = async (username, password, onSuccess, onFailure) => {
  if (!username || !password) {
    return onFailure("Must enter a username and password");
  }
  try {
    const response = await axios.post("/api/users/login", {
      username: username,
      password: password,
    });
    onSuccess(response.data.user);
  } catch (error) {
    onFailure(error.response.data.message);
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
  console.log(password, password2);
  try {
    const response = await axios.post("/api/users", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    });
    onSuccess(response.data.user);
  } catch (error) {
    onFailure(error.response.data.message);
  }
};

const getLoggedInUser = async () => {
  const response = await axios.get("/api/users");
  console.log(response);
  return response.data.user;
};

const logout = async () => {
  await axios.delete("/api/users");
};

const getProduct = async (code) => {
  try {
    let res = await axios.get("/api/products/" + code);
    let item = res.data[0]; // TODO: handle case where the barcode isn't unique
    console.log("Product:", item);
    return item;
  } catch {
    try {
      const data = await fetch(
        "https://nutritionix-api.p.rapidapi.com/v1_1/item?upc=" + code,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
            "x-rapidapi-key":
              "117f58b37bmshefcfb5c06599164p15d063jsnf2337c5ea376",
          },
        }
      );
      let item = await data.json();
      console.log("Item:", item);
      if (item.item_name != null) {
        return {
          name: item.item_name,
          brand: item.brand_name,
          description: item.item_description,
        };
      }
    } catch {
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
    formData.append("tags", item.tags);
    formData.append("amount", item.amount);
    formData.append("unit", item.unit);
    formData.append("exipration", item.exipration);
    const response = await axios.post("/api/products", formData);
    // const response = await axios.post("/api/products", item);
    let data = response.data;
    console.log("Data in add product sf: ", data);
    return {
      message: data.message,
      src: data.src,
      state: {
        id: data.id,
        oldCode: data.code,
        oldName: data.name,
        oldBrand: data.brand,
        oldDescription: data.description,
        oldTags: data.tags,
        oldAmount: data.amount,
        oldUnit: data.unit,
        oldContainer: data.container,
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
  const response = await axios.put("/api/products/" + product.id, product);
  console.log(response.data);
};

const getItem = async (id) => {
  const res = await axios.get("/api/storage/" + id);
  res.data.expiration = formatDate(res.data.expiration);
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
    console.log("My storage:", response.data);
    setItems(response.data);
  } catch (error) {
    console.log(error.response.data.message);
    setItems([]);
  }
};

const addFoodStorage = async (userId, item) => {
  if (item.name === "") {
    console.log("Nothing to add");
    return;
  }
  console.log("Adding item:", item);
  try {
    const response = await axios.post("/api/storage", {
      user: userId,
      barcode: item.code,
      name: item.name,
      brand: item.brand,
      description: item.description,
      container: item.container,
      expiration: item.expiration,
      tags: item.tags,
      amount: item.amount,
      unit: item.unit,
      quantity: item.quantity,
      src: item.src,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const updateItem = async (item) => {
  const response = await axios.put("/api/storage/" + item.id, item);
  console.log(response.data);
};

const getRecipes = async (itemName, setItems) => {
  try {
    let response = await axios.get("/api/recipes/" + itemName);
    setItems(response.data);
  } catch (error) {
    console.log(error);
    setItems([]);
  }
  // await fetch(
  //   "https://api.edamam.com/api/recipes/v2?type=public&q=" +
  //     item +
  //     "&app_id=3a833dd2&app_key=688beca46c7ed7483c41a629c1c183a3"
  // )
  //   .then((data) => data.json())
  //   .then((recipes) => onSuccess(recipes));
};

const formatDate = (date) => {
  if (date == null) return "Unknown";
  return moment(date?.substring(0, 10)).format("D MMM YYYY");
};

export default {
  login,
  register,
  getLoggedInUser,
  logout,
  getProduct,
  addProduct,
  updateProduct,
  getItem,
  deleteItem,
  getStorage,
  addFoodStorage,
  updateItem,
  getRecipes,
};
