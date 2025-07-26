import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: false,
  allowPublicKeyRetrieval: true,
  authPlugins: {
    mysql_clear_password: () => () =>
      Buffer.from(process.env.DB_PASSWORD + "\0"),
  },
});

export const query = async (text, params = []) => {
  try {
    const [rows] = await pool.execute(text, params);
    return { rows };
  } catch (error) {
    throw error;
  }
};
