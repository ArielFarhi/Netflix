import React from "react";
import { usePrograms } from "../api/programData";
import { v4 as uuid } from "uuid";
import LoadingScreen from "./ui/LoadingScreen";

const NewReleasesRow = ({ setSelectedMovie, type, title = "New on Netflix" }) => {
  const isAll = type === "all";

  const {
    data: movies = [],
    isLoading: loadingMovies,
    error: errorMovies,
  } = usePrograms({ query: "newest", type: isAll ? "movie" : type });

  const {
    data: tvShows = [],
    isLoading: loadingTV,
    error: errorTV,
  } = usePrograms({ query: "newest", type: isAll ? "tv" : null });

  const newReleases = isAll
    ? [...movies, ...tvShows].map((item) => ({
        ...item,
        type: item.media_type || item.type || (item.name ? "tv" : "movie"),
      }))
    : movies;

  const isLoading = loadingMovies || (isAll && loadingTV);
  const error = errorMovies || (isAll && errorTV);

  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error fetching content.</div>;

  return (
    <section className="mt-8 w-full">
      <h3 className="text-[20px] font-medium mb-3 relative z-10">{title}</h3>
      <div className="relative flex items-center w-full">
        <div className="flex gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {newReleases.map((program) => (
            <img
              key={uuid()}
              src={`https://image.tmdb.org/t/p/w500${program.poster_path}`}
              alt={program.title || program.name}
              className="min-w-[218px] h-[123px] object-cover rounded cursor-pointer transition-transform hover:scale-105"
              onClick={() =>
                setSelectedMovie({
                  id: program.id,
                  type: program.type || "movie",
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewReleasesRow;