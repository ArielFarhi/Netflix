import Program from "../models/Program.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const tmdbRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
        page: 1,
        ...params,
      },
    });
    return response.data.results || response.data;
  } catch (err) {
    console.error(`TMDB Request Error: ${err.message}`);
    throw new AppError("TMDB API Error", 500);
  }
};

const listPrograms = async ({ type }) => {
  let sortBy;
  switch (type) {
    case "newest":
      sortBy = "release_date.desc";
      break;
    case "popular":
      sortBy = "popularity.desc";
      break;
    case "most-viewed":
      sortBy = "vote_count.desc";
      break;
    default:
      sortBy = "popularity.desc";
  }

  return await tmdbRequest("/discover/movie", { sort_by: sortBy });
};

const addProgram = async (programData) => {
  const created = await Program.create(programData);
  return created;
};

const getProgramDetail = async (id, type = "movie") => {
  try {
    const endpoint = type === "tv" ? `/tv/${id}` : `/movie/${id}`;
    return await tmdbRequest(endpoint);
  } catch (error) {
    if (error.response?.status === 404) {
      throw new AppError(`No ${type} found with ID ${id}`, 404);
    }
    throw new AppError("Error fetching program detail", 500);
  }
};

const searchPrograms = async ({ type = "movie", query, category, language = "en-US" }) => {
  const endpoint = query?.trim()
    ? `/search/${type}`
    : `/discover/${type}`;

  const params = {
    language,
    ...(query?.trim() && { query }),
    ...(category && { with_genres: category }),
  };

  return await tmdbRequest(endpoint, params);
};

const getTopRatedPrograms = async (type = "movie") => {
  const endpoint = type === "tv" ? "/tv/top_rated" : "/movie/top_rated";
  return await tmdbRequest(endpoint);
};

const getAnimatedPrograms = async (type = "movie") => {
  const endpoint = `/discover/${type}`;
  const results = await tmdbRequest(endpoint, {
    with_genres: "16",
    sort_by: "popularity.desc",
  });

  return results.filter((item) => item.genre_ids?.includes(16));
};


export default {
  listPrograms,
  addProgram,
  getProgramDetail,
  searchPrograms,
  getTopRatedPrograms,
  getAnimatedPrograms,
};


