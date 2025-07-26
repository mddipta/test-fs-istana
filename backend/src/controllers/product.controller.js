import { ProductModel } from "../models/product.model.js";
import { formatResponse } from "../utils/response.js";

async function validateProductIsExists(code, res) {
  const product = await ProductModel.findByCode(code);
  if (product) {
    return res
      .status(400)
      .json(formatResponse(null, "Product already exists", 400));
  }
}

export async function getAll(req, res) {
  try {
    const products = await ProductModel.findAll();
    return res.status(200).json(formatResponse(products, "Success", 200));
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(400)
      .json(formatResponse(null, "Error fetching products", 400));
  }
}

export async function create(req, res) {
  const { code, name, price, stock } = req.body;
  try {
    await validateProductIsExists(code, res);
    const product = await ProductModel.create({ code, name, price, stock });
    return res.status(201).json(formatResponse(product, "Success", 201));
  } catch (error) {
    console.error("Error creating product:", error);
    return res
      .status(400)
      .json(formatResponse(null, "Error creating product", 400));
  }
}
