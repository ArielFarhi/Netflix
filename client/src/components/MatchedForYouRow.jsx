import React, { useEffect, useState, useMemo } from "react";
import { getRecommendations } from "../api/recommendByAI";
import LoadingScreen from "./ui/LoadingScreen";
import { useGetReviews } from "../api/reviewData";
import { usePrograms } from "../api/programData";

const MatchedForYouRow = ({ setSelectedMovie, title = "Top Matches For You" }) => {
  const { data: userReviews, isLoading: loadingReviews } = useGetReviews();
  const { data: movies = [], isLoading: loadingMovies } = usePrograms({ query: "all", type: "movie" });
  const { data: tvShows = [], isLoading: loadingTV } = usePrograms({ query: "all", type: "tv" });

  const [recommended, setRecommended] = useState([]);

  const allPrograms = useMemo(() => [...movies, ...tvShows], [movies, tvShows]);
  const loadingPrograms = loadingMovies || loadingTV;

  useEffect(() => {
    if (!loadingReviews && !loadingPrograms && userReviews.length && allPrograms.length) {
      const result = getRecommendations({ userReviews, allPrograms });
      setRecommended([...(result.movies || []), ...(result.tvShows || [])]);
    }
  }, [userReviews, allPrograms, loadingReviews, loadingPrograms]);

  useEffect(() => {
    console.log("🔍 recommended:", recommended);
    console.log("🔍 userReviews:", userReviews);
    console.log("🔍 allPrograms:", allPrograms);
  }, [recommended, userReviews, allPrograms]);

  if (loadingReviews || loadingPrograms) return <LoadingScreen />;

  return (
    <section className="mt-8 w-full">
      <h3 className="text-[20px] font-medium mb-3 relative z-10">{title}</h3>
      {!recommended.length ? (
        <p className="text-gray-400 text-sm">No recommendations yet.</p>
      ) : (
        <div className="relative flex items-center w-full">
          <div className="flex flex-row gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
            {recommended.map((program) => (
              <img
                key={program.id}
                src={`https://image.tmdb.org/t/p/w500${program.poster_path}`}
                alt={program.title || program.name}
                className="min-w-[218px] h-[123px] object-cover rounded cursor-pointer transition-transform hover:scale-105"
                onClick={() =>
                  setSelectedMovie({
                    id: program.id,
                    type: program.type || program.media_type || "movie",
                  })
                }
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default MatchedForYouRow;