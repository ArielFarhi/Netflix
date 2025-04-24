import movieListService from "../services/movieListService.js";

export const addMovie = async (req, res) => {
    try {
      console.log("📥 req.body:", req.body); 
      const movie = await movieListService.addMovieToList(req.body);
      res.status(201).json(movie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

export const getMyList = async (req, res) => {
  try {
    const movies = await movieListService.getMyMovieList(req.params.userId);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your movie list." });
  }
};