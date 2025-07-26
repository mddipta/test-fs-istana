import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
