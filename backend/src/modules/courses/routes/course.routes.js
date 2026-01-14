import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
} from "../../courses/controller/course.controller.js";

const courseRouter = express.Router();
courseRouter.get("/all-courses", getAllCourses);
courseRouter.post("/create-course", createCourse);
courseRouter.delete("/delete-course/:id", deleteCourse);

export default courseRouter;
