import React from "react";
import { useMovieList } from "../api/movieList";
import { useUserAuth } from "../context/Authentication.jsx";
import LoadingScreen from "./ui/LoadingScreen";

const AddedToMyListPrograms = ({ setSelectedMovie }) => {
  const { user } = useUserAuth();
  const { data: myList, isLoading, error } = useMovieList(user?._id);

  if (isLoading) return <LoadingScreen />
  if (error) return <div>Error fetching your list!</div>
  if (!myList?.length) return <div className="text-gray-400 mt-6">Your list is empty.</div>

  return (
    <div className="mt-8 w-full">
      <h3 className="font-medium text-[20px] mb-3 relative z-10">My List</h3>
      <div className="relative flex items-center w-full">
        <div className="w-full flex flex-row gap-4 overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {myList.map((movie) => (
            <img
              key={movie.movieId || movie.id}
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title || "Movie Poster"}
              className="min-w-[218px] h-[123px] inline-block object-cover rounded cursor-pointer transition-transform hover:scale-105"
              onClick={() =>
                setSelectedMovie({
                  id: movie.movieId || movie.id,
                  type: movie.type || "movie",
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddedToMyListPrograms;