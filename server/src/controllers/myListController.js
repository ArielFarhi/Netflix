import MyList from "../models/MyList.js";

export const addMovie = async (req, res, next) => {
  try {
    const { movieId, title, posterPath, profileId } = req.body;

    const exists = await MyList.findOne({ userId: req.user._id, movieId });
    if (exists) {
      return res.status(409).json({ message: "Movie already in your list" });
    }

    const movie = await MyList.create({
      userId: req.user._id,
      movieId,
      title,
      posterPath,
      profileId
    });

    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};

export const getMyList = async (req, res, next) => {
  try {
    const movies = await MyList.find({ userId: req.user._id });
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

export const removeMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const deleted = await MyList.findOneAndDelete({
      userId: req.user._id,
      movieId
    });

    if (!deleted) {
      return res.status(404).json({ message: "Movie not found in your list" });
    }

    res.status(200).json({ message: "Movie removed from your list" });
  } catch (error) {
    next(error);
  }
};
