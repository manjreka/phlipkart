const {
  createProductsServices,
  updateProductServices,
  deleteProductServices,
  getSingleProductService,
  getAllProductService,
} = require("../services/product.services");
const {
  validateProduct,
  validateUpdateProduct,
} = require("../utils/validateProduct.utlis");

const createProducts = async (req, res) => {
  try {
    validateProduct(req.body);
    const response = await createProductsServices(req.body);
    return res.status(201).json({ message: response });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ error: err.details[0].message });
    }

    return res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    validateUpdateProduct(req.body);
    const response = await updateProductServices(req.body);
    return res.status(200).json({ message: response });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ error: err.details[0].message });
    }

    return res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteProductServices(id);
    return res.status(200).json({ message: response });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ error: err.details[0].message });
    }

    return res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await getAllProductService();
    return res.status(200).json({ message: products });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ error: err.details[0].message });
    }

    return res.status(500).json({ error: err.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getSingleProductService(id);
    return res.status(200).json({ message: response });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ error: err.details[0].message });
    }

    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProducts,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
};
