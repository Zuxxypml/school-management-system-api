import express from "express";
import {
  createNewStudent,
  deleteStudent,
  getAllStudents,
  studentLogin,
  updateStudentDetails,
} from "../controllers/studentControllers.js";
import auth from "../middleware/authMiddleWare.js";

const studentRouter = express.Router();

studentRouter.route("/").get(auth, getAllStudents).post(auth, createNewStudent);
studentRouter
  .route("/:id")
  .patch(auth, updateStudentDetails)
  .delete(auth, deleteStudent);
studentRouter
  .route("/login")
  .get((req, res) =>
    res.json({
      message: "What do you want here ? I'm currently on Development",
    })
  )
  .post(studentLogin);
export default studentRouter;
