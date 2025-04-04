const Product = require("../models/product.model");

const createProductsServices = async (productDetails) => {
  try {
    const { title, brand } = productDetails;

    const existingProduct = await Product.findOne({ title, brand });

    if (existingProduct) {
      throw new Error("Product already exist in DB");
    }

    await Product.create(productDetails);
    return "Product created Successfully";
  } catch (err) {
    throw err;
  }
};

const updateProductServices = async (productDetails) => {
  try {
    const { _id } = productDetails;
    const existingProduct = await Product.findById(_id);
    if (!existingProduct) {
      throw new Error("Invalid Product Id");
    }

    await Product.findByIdAndUpdate({ _id }, productDetails);
    return "product updated successfully";
  } catch (err) {
    throw err;
  }
};

const deleteProductServices = async (id) => {
  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      throw new Error("Invalid Product Id");
    }

    await Product.findByIdAndDelete({ _id: id });
    return "product deleted successfully!";
  } catch (err) {
    throw err;
  }
};

const getSingleProductService = async (id) => {
  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      throw new Error("Invalid Product Id");
    }
    return existingProduct;
  } catch (err) {
    throw err;
  }
};

const getAllProductService = async () => {
  try {
    const response = await Product.find();
    return response;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createProductsServices,
  updateProductServices,
  deleteProductServices,
  getSingleProductService,
  getAllProductService,
};
