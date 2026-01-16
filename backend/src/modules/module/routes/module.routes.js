import express from "express";
import { createModule } from "../controller/module.controller.js";
const moduleRouter = express.Router();
import { upload } from "../../../core/middleware/uploadMiddleware.js";

moduleRouter.post("/create/:courseId", upload.any(), createModule);
export default moduleRouter;
