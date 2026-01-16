import express from "express";
import { createLession } from "../controller/lession.controller.js";
const lessionRouter = express.Router();

import { upload } from "../../../core/middleware/uploadMiddleware.js";

lessionRouter.post("/create/:courseId", upload.any(), createLession);
export default lessionRouter;
