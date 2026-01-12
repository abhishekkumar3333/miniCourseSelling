import express from "express";
import { createCourse, getAllCourses } from "../../courses/controller/course.controller.js";

const courseRouter = express.Router();
courseRouter.get("/all-courses", getAllCourses);
courseRouter.post("/create-course", createCourse);

export default courseRouter;
