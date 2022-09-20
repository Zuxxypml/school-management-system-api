import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import teacherRouter from "./routes/teacherRoute.js";
import studentRouter from "./routes/studentRoute.js";

// Constants
dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);

// Listener
async function connectDbAndListen() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Listening on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
await connectDbAndListen();
