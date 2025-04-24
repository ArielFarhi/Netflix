export const getRecommendations = ({ userReviews = [], allPrograms = [] }) => {
    const genreScores = {};
  
    userReviews.forEach((review) => {
      const program = allPrograms.find((p) =>
        String(p.id) === String(review.programId || review.movieId)
      );
      if (!program) return;
  
      program.genres?.forEach((genre) => {
        genreScores[genre] = (genreScores[genre] || 0) + review.rating;
      });
    });
  
    const scoredPrograms = allPrograms
      .filter(
        (p) =>
          !userReviews.find(
            (r) => String(r.programId || r.movieId) === String(p.id)
          )
      )
      .map((program) => {
        let score = 0;
        program.genres?.forEach((genre) => {
          score += genreScores[genre] || 0;
        });
        return { ...program, score };
      });
  
    const recommendedMovies = scoredPrograms
      .filter((p) => p.type === "movie")
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  
    const recommendedTVShows = scoredPrograms
      .filter((p) => p.type === "tv-show")
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  
    return {
      movies: recommendedMovies,
      tvShows: recommendedTVShows,
    };
  };