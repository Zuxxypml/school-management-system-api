import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Sign up Static Method
teacherSchema.statics.signup = async function (
  firstname,
  lastname,
  password,
  email,
  username
) {
  if (!email || !password || !firstname || !lastname || !username) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not Valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Weak Password");
  }
  const ifEmailExists = await this.findOne({ email });
  if (ifEmailExists) {
    throw Error("Email in use");
  }
  // Encryption
  const salt = await bcrypt.genSalt(13);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User Record
  const teacher = await this.create({
    email,
    password: hashedPassword,
    firstname,
    lastname,
    username,
  });
  return teacher;
};

teacherSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields are required");
  }
  const teacher = await this.findOne({ username });
  if (!teacher) {
    throw Error("Can't find matching credentials. Check and try again");
  }
  const match = await bcrypt.compare(password, teacher.password);
  if (!match) {
    throw Error("Incorrect Password");
  }
  return teacher;
};

export const Teacher = mongoose.model("Teacher", teacherSchema);
