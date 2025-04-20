import React from "react";
import { usePrograms } from "../api/programData";
import { v4 as uuid } from "uuid";
import LoadingScreen from "./ui/LoadingScreen"; 

const MatchedForYouRow = ({ setSelectedMovie, type }) => {
  const {
    data: matchedPrograms,
    isLoading,
    error,
  } = usePrograms({ query: "popular", type });

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error fetching matched programs!</div>;

  return (
    <section className="mt-8 w-full">
      <h3 className="font-medium text-[20px] mb-3 relative z-10">Matched To You</h3>
      <div className="relative flex items-center w-full">
        <div className="w-full flex flex-row gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {[...matchedPrograms].reverse().map((movie) => (
            <img
              key={uuid()}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="min-w-[218px] h-[123px] inline-block object-cover rounded cursor-pointer"
              onClick={() => setSelectedMovie(movie.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchedForYouRow;