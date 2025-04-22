import React from "react";
import { usePrograms } from "../api/programData";
import { v4 as uuid } from "uuid";
import LoadingScreen from "./ui/LoadingScreen";

const TopViewsRow = ({ setSelectedMovie, type }) => {
  const {
    data: mostViewed,
    isLoading,
    error,
  } = usePrograms({ query: "most-viewed", type });

  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error loading most viewed content.</div>;

  return (
    <section className="mt-8 w-full">
      <h3 className="text-[20px] font-medium mb-3 relative z-10">Most Viewed</h3>
      <div className="relative flex items-center w-full">
        <div className="flex flex-row gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {mostViewed?.map((movie) => (
            <img
              key={uuid()}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="min-w-[218px] h-[123px] object-cover rounded cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedMovie(movie.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopViewsRow;