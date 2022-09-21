import express from "express";
import {
  createNewStudent,
  deleteStudent,
  getAllStudents,
  updateStudentDetails,
} from "../controllers/studentControllers.js";
import auth from "../middleware/authMiddleWare.js";

const studentRouter = express.Router();

studentRouter.route("/").get(auth, getAllStudents).post(createNewStudent);
studentRouter
  .route("/:id")
  .patch(auth, updateStudentDetails)
  .delete(auth, deleteStudent);

export default studentRouter;
