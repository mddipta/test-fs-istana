import { query } from "../config/database.js";

export const ProductModel = {
  findAll: async () => {
    const sql = `SELECT * FROM products WHERE deleted_at IS NULL`;
    try {
      const res = await query(sql);
      return res.rows;
    } catch (error) {
      console.error("Error finding all products:", error);
      throw error;
    }
  },

  findByCode: async (code) => {
    const sql = `SELECT * FROM products WHERE code = ? AND deleted_at IS NULL`;
    try {
      const res = await query(sql, [code]);
      return res.rows[0];
    } catch (error) {
      console.error("Error finding product by code:", error);
      throw error;
    }
  },

  create: async (product) => {
    const sql = `INSERT INTO products (code, name, price, stock) VALUES (?, ?, ?, ?)`;
    try {
      const res = await query(sql, [
        product.code,
        product.name,
        product.price,
        product.stock,
      ]);
      return res.rows[0];
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },
};
