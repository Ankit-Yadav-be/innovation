import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import postRoutes from "./src/routes/post/index.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

dotenv.config();

const app = express();

//  Middlewares
app.use(cors());
app.use(express.json());

connectDB();

//  Routes
app.get("/", (req, res) => {
  res.send("API Running....");
});

app.use("/api/posts", postRoutes);

app.use(errorMiddleware);

export default app;
