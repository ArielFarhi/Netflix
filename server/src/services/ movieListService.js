//need to change
import MovieList from "../models/MovieList.js";
import AppError from "../utils/AppError.js";

const addMovieToList = async ({
  userId,
  movieId,
  title,
  posterPath,
  overview,
}) => {
  const exists = await MovieList.findOne({ userId, movieId });
  if (exists) throw new AppError("Movie already exists in list.", 409);

  const movie = new MovieList({ userId, movieId, title, posterPath, overview });
  return await movie.save();
};

const getMyMovieList = async (userId) => {
  return await MovieList.find({ userId }).sort({ addedAt: -1 });
};

export default { addMovieToList, getMyMovieList };