import mongoose from "mongoose";
import MovieList from "../models/MovieList.js";

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

async function addMovieToList(movieData) {
  const { userId, movieId, title, posterPath } = movieData;

  if (!userId || !movieId || !title) {
    throw new AppError("Missing required fields", 400);
  }

  const objectUserId = new mongoose.Types.ObjectId(userId); // 🛠 המרה

  const alreadyExists = await MovieList.findOne({
    userId: objectUserId,
    movieId,
  });

  if (alreadyExists) {
    throw new AppError("Movie already exists in list.", 409);
  }

  const newMovie = new MovieList({
    userId: objectUserId,
    movieId,
    title,
    posterPath,
  });

  try {
    return await newMovie.save();
  } catch (err) {
    console.error("❌ Failed to save movie:", err.message);
    throw new AppError("Failed to save movie to list.", 400);
  }
}

async function getMyMovieList(userId) {
  return await MovieList.find({ userId }).sort({ addedAt: -1 });
}

export default {
  addMovieToList,
  getMyMovieList,
};