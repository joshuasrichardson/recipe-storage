import axios from "axios";

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
  const response = await axios.post("/api/products", {
    code: item.code,
    name: item.name,
    brand: item.brand,
    description: item.description,
    container: item.container,
    expiration: item.expiration,
  });
  let data = response.data;
  console.log(data);
  return {
    message: data.message,
    state: {
      id: data.id,
      oldCode: data.code,
      oldName: data.name,
      oldBrand: data.brand,
      oldDescription: data.description,
      newCode: item.code,
      newName: item.name,
      newBrand: item.brand,
      newDescription: item.description,
    },
  };
};

const updateProduct = async (product) => {
  const response = await axios.put("/api/products/" + product.id, {
    code: product.code,
    name: product.name,
    brand: product.brand,
    description: product.description,
  });
  console.log(response.data);
};

const getItem = async (id) => {
  const res = await axios.get("/api/storage/" + id);
  return res.data;
};

const getStorage = async (setItems) => {
  try {
    let response = await axios.get("/api/storage/");
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
  console.log("Adding item:", item.code, item.name);
  try {
    const response = await axios.post("/api/storage", {
      user: userId,
      barcode: item.code,
      name: item.name,
      brand: item.brand,
      description: item.description,
      container: item.container,
      expiration: item.expiration,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const getRecipes = async (item, onSuccess) => {
  await fetch(
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
      item +
      "&app_id=3a833dd2&app_key=688beca46c7ed7483c41a629c1c183a3"
  )
    .then((data) => data.json())
    .then((recipes) => onSuccess(recipes));
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
  getStorage,
  addFoodStorage,
  getRecipes,
};
