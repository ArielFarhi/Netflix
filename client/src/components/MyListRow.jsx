import React from "react";
import { useMovieList } from "../api/movieList";
import { v4 as uuid } from "uuid";
import LoadingScreen from "./ui/LoadingScreen";

const MyListRow = ({ setSelectedMovie, userId }) => {
  const {
    data: myList = [],
    isLoading,
    error,
  } = useMovieList(userId);

  if (!userId) return null;

  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error loading your list.</div>;

  return (
    <section className="mt-8 w-full">
      <h3 className="text-[20px] font-medium mb-3 relative z-10">My List</h3>
      <div className="relative flex items-center w-full">
        <div className="flex flex-row gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {myList?.map((movie) => (
            <img
              key={uuid()}
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title}
              className="min-w-[218px] h-[123px] object-cover rounded cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedMovie(movie.movieId)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyListRow;