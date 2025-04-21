import jwt from "jsonwebtoken";
import User from "../models/User.js";

function generateJwtToken(id) {
  const payload = { userId: id };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function validatePasswordFormat(password) {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return pattern.test(password);
}

async function registerUser({ email, phone, password, role }) {
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    const err = new Error("Email already in use");
    err.statusCode = 409;
    throw err;
  }

  const existingPhone = await User.findOne({ phone });
  if (existingPhone) {
    const err = new Error("Phone number already in use");
    err.statusCode = 409;
    throw err;
  }

  if (!validatePasswordFormat(password)) {
    const err = new Error(
      "Password must be at least 8 characters and include at least one letter and one number"
    );
    err.statusCode = 422;
    throw err;
  }

  const newUser = await User.create({
    email,
    phone,
    password,
    role: role || "User"
  });

  const token = generateJwtToken(newUser._id);
  return { user: newUser, token };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  const token = generateJwtToken(user._id);
  return { user, token };
}

export default {
  registerUser,
  loginUser
};
