import express from "express";
import {
  createNewStudent,
  deleteStudent,
  getAllStudents,
  updateStudentDetails,
} from "../controllers/studentControllers.js";

const studentRouter = express.Router();

studentRouter.route("/").get(getAllStudents).post(createNewStudent);
studentRouter.route("/:id").patch(updateStudentDetails).delete(deleteStudent);

export default studentRouter;
