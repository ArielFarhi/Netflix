const axios = require("axios");

const TMDB_CONFIG = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: process.env.TMDB_API_KEY,
  language: "en-US",
};

async function getProgramInfo(tmdbId, category = "movie") {
  const endpoint = `${TMDB_CONFIG.baseUrl}/${category}/${tmdbId}`;
  const params = {
    api_key: TMDB_CONFIG.apiKey,
    language: TMDB_CONFIG.language,
    withCredentials: true,
  };

  try {
    const { data } = await axios.get(endpoint, { params });
    return data;
  } catch (err) {
    console.error("Failed to fetch program info from TMDb:", err.message);
    throw err;
  }
}

module.exports = { getProgramInfo };