import React from "react";
import { v4 as uuid } from "uuid";
import LoadingScreen from "./ui/LoadingScreen";
import { useMovieList } from "../api/movieList";

const SavedFilm = ({ setSelectedMovie, userId }) => {
  const {
    data: myList = [],
    isLoading,
    error,
  } = useMovieList(userId);
  if (!userId) return null;
  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error loading your list.</div>;
  if (!myList.length) {
    return (
      <div className="mt-8 w-full text-center text-gray-400">
        You haven't added anything to your list yet.
      </div>
    );
  }
  return (
    <section className="mt-8 w-full">
      <h3 className="text-[20px] font-medium mb-3 relative z-10">Saved for Later</h3>
      <div className="relative flex items-center w-full">
        <div className="w-full flex flex-row gap-4 overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {myList.map((item) => (
            <img
              key={uuid()}
              src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
              alt={item.title || "Untitled"}
              className="min-w-[218px] h-[123px] inline-block object-cover rounded cursor-pointer transition-transform hover:scale-105"
              onClick={() =>
                setSelectedMovie({
                  id: item.movieId,
                  type: item.type || "movie",
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavedFilm;