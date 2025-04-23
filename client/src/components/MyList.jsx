import React from "react";
import { useAddMovieList } from "../api/movieList";
import LoadingScreen from "./ui/LoadingScreen";

const AddedToMyListPrograms = ({ setSelectedMovie }) => {
  const { data: myList, isLoading, error } = useAddMovieList();

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error fetching your list!</div>;

  return (
    <div className="mt-8 w-full">
      <h3 className="font-medium text-[20px] mb-3 relative z-10">My List</h3>
      <div className="relative flex items-center w-full">
        <div className="w-full flex flex-row gap-4 overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {myList?.map((movie) => (
            <img
              key={movie.id || movie.movieId}
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title || "Movie Poster"}
              className="min-w-[218px] h-[123px] inline-block object-cover rounded cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedMovie(movie.movieId || movie.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddedToMyListPrograms;