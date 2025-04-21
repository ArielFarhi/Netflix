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
  const { userId, movieId } = movieData;

  const alreadyExists = await MovieList.findOne({ userId, movieId });
  if (alreadyExists) {
    throw new AppError("Movie already exists in list.", 409);
  }

  const newMovie = new MovieList(movieData);
  return await newMovie.save();
}

async function getMyMovieList(userId) {
  return await MovieList.find({ userId }).sort({ addedAt: -1 });
}

export default {
  addMovieToList,
  getMyMovieList,
};