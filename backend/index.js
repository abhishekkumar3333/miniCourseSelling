import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { globalErrorHandler } from "./src/core/middleware/globalErrorHandler.js";
const app = express();

app.use(express.json());
app.use(globalErrorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
