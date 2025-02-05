import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin:process.env.FRONTEND_URL , credentials: true })); 

app.use("/api/auth", authRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });
