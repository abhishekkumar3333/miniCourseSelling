import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { globalErrorHandler } from "./src/core/middleware/globalErrorHandler.js";
import router from "./src/routes.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(router);
app.use(globalErrorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
