import mongoose from "mongoose";
import { Student } from "../models/studentModel.js";

// Gets all students records
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    return res.status(200).json(students);
  } catch (error) {
    return res.status(404).json(error);
  }
};

// Creates a new student record
export const createNewStudent = async (req, res) => {
  const student = req.body;
  try {
    const createdStudent = await Student.create({ ...student });
    return res.status(200).json(createdStudent);
  } catch (error) {
    return res.status(404).json(error);
  }
};

// Updates an existing student record
export const updateStudentDetails = async (req, res) => {
  const updateData = req.body;
  const { id } = req.params;
  console.log(id);
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        { _id: id },
        { ...updateData },
        { new: true }
      );
      return res.status(200).json(updatedStudent);
    } catch (error) {
      return res.status(404).json(error);
    }
  } else {
    return res
      .status(403)
      .json({ error: "Wtf are you sending to me huh :-< " });
  }
};

// Deletes a student record
export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await Student.findByIdAndDelete({ _id: id });
    return res.status(200).json(deletedStudent);
  } catch (error) {
    return res.status(404).json(error);
  }
};
