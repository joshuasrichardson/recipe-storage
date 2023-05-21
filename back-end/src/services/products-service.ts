import Product from "../models/products";
import fs from "fs";

const onCopy = (err) => {
  if (err) console.log(err);
  else console.log("Old file replaced!");
};

const productChanged = (product, newProduct) => {
  return (
    product &&
    (product.code || product.name) &&
    (product.code != newProduct.code ||
      product.name != newProduct.name ||
      product.brand != newProduct.brand ||
      product.description != newProduct.description ||
      product.tags != newProduct.tags ||
      product.amount != newProduct.amount ||
      product.unit != newProduct.unit)
  );
};

const saveImage = (file, product) => {
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

export const addProduct = async (newProduct, file) => {
  const products = await Product.find({ code: newProduct.code });
  const product = products.length
    ? products[0]
    : new Product({
        ...newProduct,
        src: file ? "/images/" + file.filename : newProduct.src ?? "",
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

export const updateProduct = async (product) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: product.id },
    { ...product }
  );
  updatedProduct.save();
};

export const getProductByCode = async (code: string) => {
  return await Product.findOne({ code });
};
