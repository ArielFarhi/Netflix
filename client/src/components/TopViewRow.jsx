import React from "react";
import { usePrograms } from "../api/programData";
import { v4 as uuid } from "uuid";
import LoadingScreen from "./ui/LoadingScreen";

const TopViewsRow = ({ setSelectedMovie, type, title = "Top 10 movies in the U.S. Today" }) => {
  const isAll = type === "all";

  const {
    data: movies = [],
    isLoading: loadingMovies,
    error: errorMovies,
  } = usePrograms({ query: "most-viewed", type: isAll ? "movie" : type });

  const {
    data: tvShows = [],
    isLoading: loadingTV,
    error: errorTV,
  } = usePrograms({ query: "most-viewed", type: isAll ? "tv" : null });

  const mostViewed = isAll
    ? [...movies, ...tvShows].map((item) => ({
        ...item,
        type: item.media_type || item.type || (item.name ? "tv" : "movie"),
      }))
    : movies;

  const isLoading = loadingMovies || (isAll && loadingTV);
  const error = errorMovies || (isAll && errorTV);

  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error loading most viewed content.</div>;

  return (
    <section className="mt-8 w-full">
      <h3 className="text-[20px] font-medium mb-3 relative z-10">{title}</h3>
      <div className="relative flex items-center w-full">
        <div className="flex flex-row gap-20 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide pl-[50px]">
          {mostViewed.map((movie, index) => {
            const number = index + 1;
            const isDoubleDigit = number >= 10;

            return (
              <div
                key={uuid()}
                className="relative min-w-[90px] h-[123px] flex items-center justify-center"
                style={{ flexShrink: 0 }}
              >
                <span
                  className="absolute text-[120px] font-extrabold leading-none z-0 pointer-events-none"
                  style={{
                    left: isDoubleDigit ? "-100px" : "-60px",
                    top: "0",
                    color: "transparent",
                    fontFamily: "Arial, sans-serif",
                    WebkitTextStroke: "2px #9ca3af",
                  }}
                >
                  {number}
                </span>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className={`w-[140px] h-[210px] object-cover rounded cursor-pointer z-10 transition-transform hover:scale-105 ${
                    isDoubleDigit ? "ml-4" : "ml-1"
                  }`}
                  onClick={() =>
                    setSelectedMovie({
                      id: movie.id,
                      type: movie.type || "movie",
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopViewsRow;