import Product from "../models/products";
import fs, { NoParamCallback } from "fs";
import { File, ProductI, ProductModel } from "../types";
import { addCall, getNumCalls } from "./calls-service";
import axios from "axios";

const onCopy: NoParamCallback = (err?: NodeJS.ErrnoException): void => {
  if (err) console.log(err);
  else console.log("Old file replaced!");
};

const productChanged = (product: ProductI, newProduct: ProductI): boolean => {
  return (
    product &&
    (product.code || product.name) &&
    (product.code !== newProduct.code ||
      product.name !== newProduct.name ||
      product.brand !== newProduct.brand ||
      product.description !== newProduct.description ||
      product.tags !== newProduct.tags ||
      product.amount !== newProduct.amount ||
      product.unit !== newProduct.unit)
  );
};

const saveImage = (file: File, product: ProductModel): void => {
  const imagePath = "/images/" + file.filename;
  if (product.src) {
    fs.copyFile(
      process.env.IMAGES_DIR + imagePath,
      process.env.IMAGES_DIR + product.src,
      0,
      onCopy
    );
  } else {
    product.src = imagePath;
    product.save();
  }
};

export const addProduct = async (
  newProduct: ProductI,
  file: File
): Promise<{ message?: string; product?: ProductI }> => {
  const products = await Product.find({ code: newProduct.code });
  const product = products.length
    ? products[0]
    : new Product({
        ...newProduct,
        src: file ? "/images/" + file.filename : newProduct.src || "",
      });

  if (file && product) saveImage(file, product);

  if (productChanged(product, newProduct)) {
    return {
      message: "Item already exists with different attributes.",
      product,
    };
  }

  if (newProduct.src) product.src = newProduct.src;

  product.save();
  return { product };
};

export const updateProduct = async (
  id: string,
  product: ProductI
): Promise<void> => {
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    { ...product }
  );
  updatedProduct.save();
};

export type ItemAutofill = {
  id?: string;
  name: string;
  code?: string;
  container?: string;
  brand?: string;
  description?: string;
  amount?: number | string;
  unit?: string;
  tags?: string;
  src?: string;
};

type APIKeychain = {
  X_API_KEY: string;
  X_APP_KEY: string;
  X_RAPIDAPI_HOST: string;
  X_RAPIDAPI_KEY: string;
};

const getNutritionixV1Item = async (code: string): Promise<ItemAutofill> => {
  const response = await axios.get(
    "https://nutritionix-api.p.rapidapi.com/v1_1/item?upc=" + code,
    {
      headers: {
        "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      },
    }
  );
  let item = response.data as {
    item_name: string;
    brand_name: string;
    item_description: string;
  };
  if (!!item.item_name) {
    return {
      name: item.item_name,
      brand: item.brand_name,
      description: item.item_description,
    };
  }
};

const getNutritionixV2Item = async (code: string): Promise<ItemAutofill> => {
  const canAccess = (await getNumCalls("nutritionixV2")) < 50;
  if (!canAccess) return getNutritionixV1Item(code);
  const response = await axios.get(
    "https://trackapi.nutritionix.com/v2/search/item?upc=" + code,
    {
      headers: {
        "x-app-id": process.env.X_API_KEY,
        "x-app-key": process.env.X_APP_KEY,
      },
    }
  );

  addCall("nutritionixV2");
  const item = (
    response as {
      data: {
        foods: {
          food_name: string;
          brand_name: string;
          nf_ingredient_statement: string;
          tags: string;
          photo: any;
        }[];
      };
    }
  ).data.foods[0];
  if (!!item.food_name) {
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
};

type OpenFoodsProductType = {
  product_name: string;
  image_url: string;
  _keywords: string[];
};

const getOpenFoodFactsItem = async (code: string): Promise<ItemAutofill> => {
  const response = await axios.get(
    "https://world.openfoodfacts.org/api/v2/product/" + code
  );

  const item: OpenFoodsProductType = (
    response as {
      data: {
        product: {
          product_name: string;
          _keywords: string[];
          image_url: string;
        };
      };
    }
  ).data.product;

  if (response.status) {
    return {
      name: item.product_name,
      unit: "Grams",
      tags: item._keywords.join(", "),
      src: item.image_url,
    };
  }
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

export const getProductByCode = async (code: string): Promise<ProductI> => {
  const product = await Product.findOne({ code });

  try {
    if (code?.length === 12 && !product?.src) {
      const productWithSrc = await getNutritionixV2Item(code);
      return product
        ? (copyMissingFields(
            product as unknown as ItemAutofill,
            productWithSrc
          ) as any)
        : productWithSrc;
    } else if (code?.length === 13) {
      const opProduct = await getOpenFoodFactsItem(code);
      return product
        ? (copyMissingFields(product as any, opProduct) as any)
        : opProduct;
    }

    return product;
  } catch (err) {
    try {
      console.log(err);
      return (await getOpenFoodFactsItem(code)) as any;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
