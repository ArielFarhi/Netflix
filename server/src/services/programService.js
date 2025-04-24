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

// const getProgramDetail = async (id, type = "movie") => {
//   try {
//     const endpoint = type === "tv" ? `/tv/${id}` : `/movie/${id}`;
//     const program = await tmdbRequest(endpoint);

//     const country =
//       type === "tv"
//         ? program.origin_country?.[0] || "Unknown"
//         : program.production_countries?.[0]?.name || "Unknown";

//     return {
//       id: program.id,
//       title: program.title || program.name,
//       overview: program.overview,
//       poster_path: program.poster_path,
//       release_date: program.release_date || program.first_air_date,
//       vote_average: program.vote_average,
//       genres: program.genres?.map((g) => g.name) || [],
//       country, 
//     };
//   } catch (error) {
//     if (error.response?.status === 404) {
//       throw new AppError(`No ${type} found with ID ${id}`, 404);
//     }
//     throw new AppError("Error fetching program detail", 500);
//   }
// };

const getProgramDetail = async (id, type) => {
  try {
    const endpoint = type === "tv" ? `/tv/${id}` : `/movie/${id}`;
    const program = await tmdbRequest(endpoint);

    const country =
      type === "tv"
        ? program.origin_country?.[0] || "Unknown"
        : program.production_countries?.[0]?.name || "Unknown";

    // 1. get images
    const images = await tmdbRequest(`${endpoint}/images`);
    console.log(images);
    const backdrops = images.backdrops?.slice(0, 3).map((img) => img.file_path) || [];

    // 2. get cast
    const credits = await tmdbRequest(`${endpoint}/credits`);
    const cast = credits.cast?.slice(0, 4).map((member) => ({
      name: member.name,
      character: member.character,
      profile_path: member.profile_path,
    })) || [];

    // 3. get episodes (if it's a TV show)
    let episodes = [];
    console.log(`type:${type}`);
    if (type === "tv") {
      const seasonNumber = program?.number_of_seasons || 1;
      if (seasonNumber) {
        const seasonData = await tmdbRequest(`/tv/${id}/season/${seasonNumber}`);
        console.log(searchPrograms);
        episodes = seasonData.episodes?.map((ep) => ({
          name: ep.name,
          overview: ep.overview,
          still_path: ep.still_path,
          episode_number: ep.episode_number,
          runtime: ep.runtime,
        })) || [];
      }
    }

    return {
      id: program.id,
      title: program.title || program.name,
      overview: program.overview,
      poster_path: program.poster_path,
      backdrop_path: program.backdrop_path,
      release_date: program.release_date || program.first_air_date,
      vote_average: program.vote_average,
      genres: program.genres?.map((g) => g.name) || [],
      country,
      backdrops,
      cast,
      episodes,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new AppError(`No ${type} found with ID ${id}`, 404);
    }
    throw new AppError("Error fetching program detail", 500);
  }
};

const searchPrograms = async ({
  type = "movie",
  query,
  category,
  language = "English",
  sortBy,
  ageRating,
}) => {
  const endpoint = query?.trim()
    ? `/search/${type}`
    : `/discover/${type}`;

  const params = {
    language: getLanguageCode(language),
    with_original_language: getLanguageShortCode(language),
    ...(query?.trim() && { query }),
    ...(category && { with_genres: category }),
    ...(sortBy && {
      sort_by:
        sortBy === "A-Z"
          ? "original_title.asc"
          : sortBy === "Z-A"
            ? "original_title.desc"
            : "popularity.desc",
    }),
    ...(ageRating && ageRating !== "All" && {
      certification_country: "US",
      certification_lte: ageRating,
    }),
  };

  return await tmdbRequest(endpoint, params);
};

const getLanguageCode = (name) => {
  const map = {
    English: "en-US",
    Spanish: "es-ES",
    French: "fr-FR",
  };
  return map[name] || "en-US";
};

const getLanguageShortCode = (name) => {
  const map = {
    English: "en",
    Spanish: "es",
    French: "fr",
  };
  return map[name] || "en";
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

// import Program from "../models/Program.js";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//     this.isOperational = true;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// const TMDB_API_KEY = process.env.TMDB_API_KEY;
// const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// const tmdbRequest = async (endpoint, params = {}) => {
//   try {
//     const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
//       params: {
//         api_key: TMDB_API_KEY,
//         language: "en-US",
//         page: 1,
//         ...params,
//       },
//     });
//     return response.data.results || response.data;
//   } catch (err) {
//     console.error(`TMDB Request Error: ${err.message}`);
//     throw new AppError("TMDB API Error", 500);
//   }
// };

// const listPrograms = async ({ type }) => {
//   let sortBy;
//   switch (type) {
//     case "newest":
//       sortBy = "release_date.desc";
//       break;
//     case "popular":
//       sortBy = "popularity.desc";
//       break;
//     case "most-viewed":
//       sortBy = "vote_count.desc";
//       break;
//     default:
//       sortBy = "popularity.desc";
//   }

//   return await tmdbRequest("/discover/movie", { sort_by: sortBy });
// };

// const addProgram = async (programData) => {
//   const created = await Program.create(programData);
//   return created;
// };

// const getProgramDetail = async (id, type = "movie") => {
//   try {
//     const base = type === "tv" ? `/tv/${id}` : `/movie/${id}`;

//     // Fetch main detail, credits and images in parallel
//     const [details, credits, images] = await Promise.all([
//       tmdbRequest(base),
//       tmdbRequest(`${base}/credits`),
//       tmdbRequest(`${base}/images`),
//     ]);

//     const country =
//       type === "tv"
//         ? details.origin_country?.[0] || "Unknown"
//         : details.production_countries?.[0]?.name || "Unknown";

//     const programDetail = {
//       id: details.id,
//       title: details.title || details.name,
//       overview: details.overview,
//       poster_path: details.poster_path,
//       release_date: details.release_date || details.first_air_date,
//       vote_average: details.vote_average,
//       genres: details.genres?.map((g) => g.name) || [],
//       country,
//       credits,
//       images,
//     };

//     if (type === "tv" && details.seasons) {
//       programDetail.seasons = details.seasons;
//     }

//     return programDetail;
//   } catch (error) {
//     if (error.response?.status === 404) {
//       throw new AppError(`No ${type} found with ID ${id}`, 404);
//     }
//     throw new AppError("Error fetching program detail", 500);
//   }
// };

// const searchPrograms = async ({
//   type = "movie",
//   query,
//   category,
//   language = "English",
//   sortBy,
//   ageRating,
// }) => {
//   const endpoint = query?.trim()
//     ? `/search/${type}`
//     : `/discover/${type}`;

//   const params = {
//     language: getLanguageCode(language),
//     with_original_language: getLanguageShortCode(language),
//     ...(query?.trim() && { query }),
//     ...(category && { with_genres: category }),
//     ...(sortBy && {
//       sort_by:
//         sortBy === "A-Z"
//           ? "original_title.asc"
//           : sortBy === "Z-A"
//             ? "original_title.desc"
//             : "popularity.desc",
//     }),
//     ...(ageRating && ageRating !== "All" && {
//       certification_country: "US",
//       certification_lte: ageRating,
//     }),
//   };

//   return await tmdbRequest(endpoint, params);
// };

// const getLanguageCode = (name) => {
//   const map = {
//     English: "en-US",
//     Spanish: "es-ES",
//     French: "fr-FR",
//   };
//   return map[name] || "en-US";
// };

// const getLanguageShortCode = (name) => {
//   const map = {
//     English: "en",
//     Spanish: "es",
//     French: "fr",
//   };
//   return map[name] || "en";
// };

// const getTopRatedPrograms = async (type = "movie") => {
//   const endpoint = type === "tv" ? "/tv/top_rated" : "/movie/top_rated";
//   return await tmdbRequest(endpoint);
// };

// const getAnimatedPrograms = async (type = "movie") => {
//   const endpoint = `/discover/${type}`;
//   const results = await tmdbRequest(endpoint, {
//     with_genres: "16",
//     sort_by: "popularity.desc",
//   });

//   return results.filter((item) => item.genre_ids?.includes(16));
// };

// export default {
//   listPrograms,
//   addProgram,
//   getProgramDetail,
//   searchPrograms,
//   getTopRatedPrograms,
//   getAnimatedPrograms,
// };
