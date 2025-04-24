import React from "react";
import { useMovieList } from "../api/movieList";
import LoadingScreen from "../components/ui/LoadingScreen";
import Navbar from "../components/Navbar";
import HomeFooter from "../components/HomeFooter";
import { useUserAuth } from "../context/Authentication";

const MovieList = () => {
  const { user } = useUserAuth();
  const userId = user?._id;

  const { data: myList, isLoading, error } = useMovieList(userId);

  if (!userId) return null;
  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error fetching your list.</div>;

  return (
    <div className="max-w-screen min-h-screen text-white bg-[#141414] relative overflow-x-hidden">
      <Navbar />
      <div className="mt-8 w-full">
        <h3 className="font-medium text-[20px] mb-3 relative z-10 px-8 md:px-20">
          My List
        </h3>

        <div className="relative flex items-center w-full">
          <div className="w-[90%] m-auto flex flex-row gap-4 overflow-x-auto scroll-smooth whitespace-nowrap scrollbar-hide px-4">
            {myList?.length > 0 ? (
              myList.map((movie) => (
                <div className="flex flex-col" key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt={movie.title || "Movie Poster"}
                    className="min-w-[160px] sm:min-w-[180px] md:min-w-[218px] h-[120px] md:h-[123px] object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                  />
                  <h1 className="text-center mt-1 text-sm">{movie.title}</h1>
                </div>
              ))
            ) : (
              <p className="text-white text-sm px-4">
                No movies in your list yet.
              </p>
            )}
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default MovieList;