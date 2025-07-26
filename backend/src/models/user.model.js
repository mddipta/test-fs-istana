import { query } from "../config/database.js";

export const UserModel = {
  findByUsername: async (username) => {
    const sql = `SELECT * FROM users WHERE username = ?`;
    try {
      const res = await query(sql, [username]);
      return res.rows[0];
    } catch (error) {
      console.error("Error finding user by username:", error);
      throw error;
    }
  },
};
