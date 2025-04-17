import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;
const url = DB_HOST;

console.log("DB_HOST:", DB_HOST);
console.log("DB_USER:", DB_USER);
console.log("DB_PASSWORD:", DB_PASSWORD);

const options = {
  user: DB_USER,
  pass: DB_PASSWORD,
};

mongoose
  .connect(url, options)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(`Connection error: ${err}`));