import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import movieListRoutes from "./routes/movieListRoutes.js";

const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/", express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

const corsOptions = {
  origin: ["http://localhost:3000", "https://netflix-szyh.onrender.com"],
  origin: true,
  credentials: true,
};
https://netflix-jj9n.onrender.com
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/movie-list', movieListRoutes);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});