import mongoose from "mongoose";
import { Teacher } from "../models/TeacherModel";

// Gets the Record of all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    return res.status(200).json(teachers);
  } catch (error) {
    return res.status(404).json(error);
  }
};

// Creates a new teacher record
export const createNewTeacher = async (req, res) => {
  const teacher = req.body;
  try {
    const createdTeacher = await Teacher.create({ ...teacher });
    return res.status(200).json(createdTeacher);
  } catch (error) {
    return res.status(404).json(error);
  }
};
// Update existing teacher record
export const updateTeacherDetails = async (req, res) => {
  const updateData = req.body;
  const { id } = req.params;
  console.log(id);
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        { _id: id },
        { ...updateData },
        { new: true }
      );
      return res.status(200).json(updatedTeacher);
    } catch (error) {
      return res.status(404).json(error);
    }
  } else {
    return res
      .status(403)
      .json({ error: "Wtf are you sending to me huh :-< " });
  }
};

// Deletes a teacher record
export const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete({ _id: id });
    return res.status(200).json(deletedTeacher);
  } catch (error) {
    return res.status(404).json(error);
  }
};
