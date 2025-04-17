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

async function registerUser({ username, password }) {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    const err = new Error("Email or phone already exists");
    err.statusCode = 409;
    throw err;
  }
  if (!validatePasswordFormat(password)) {
    const err = new Error(
      "Please choose a password with a minimum of 8 characters, containing both letters and digits"
    );
    err.statusCode = 422;
    throw err;
  }
  const newUser = await User.create({ username, password });
  const token = generateJwtToken(newUser._id);
  return { user: newUser, token };
}

async function loginUser(credentials) {
  const { username, password } = credentials;
  const userRecord = await User.findOne({ username });
  const isMatch = userRecord && await userRecord.matchPassword(password);
  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }
  const token = generateJwtToken(userRecord._id);
  return { user: userRecord, token };
}

export default {
  registerUser,
  loginUser,
};