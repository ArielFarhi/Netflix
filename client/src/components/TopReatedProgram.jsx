import React from "react";
import { useGetTopRatedPrograms } from "../api/programData";
import LoadingScreen from "./ui/LoadingScreen";

const TopRatedPrograms = ({ setSelectedMovie, type }) => {
  const {
    data: topRatedPrograms,
    isLoading,
    error,
  } = useGetTopRatedPrograms({ type });

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error fetching top rated programs!</div>;

  return (
    <div className="mt-8 w-full">
      <h3 className="font-medium text-[20px] mb-3 relative z-10">
        Top Rated
      </h3>
      <div className="relative flex items-center w-full">
        <div className="w-full flex flex-row gap-4 overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {topRatedPrograms?.map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || "Movie Poster"}
              className="min-w-[218px] h-[123px] inline-block object-cover rounded cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedMovie(movie.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRatedPrograms;