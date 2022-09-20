import express from "express";

const teacherRouter = express.Router();

import {
  createNewTeacher,
  deleteTeacher,
  getAllTeachers,
  updateTeacherDetails,
} from "../controllers/teacherControllers.js";

teacherRouter.route("/").get(getAllTeachers).post(createNewTeacher);
teacherRouter.route("/:id").patch(updateTeacherDetails).delete(deleteTeacher);

export default teacherRouter;
