import React from "react";
import { v4 as uuid } from "uuid";
import LoadingScreen from "./ui/LoadingScreen"; 
import { useGetReviews } from "../api/reviewData";

const RecentlyReviewedRow = ({ setSelectedMovie }) => {
  const {
    data: reviews,
    isLoading,
    error,
  } = useGetReviews();

  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error loading reviewed content.</div>;

  return (
    <section className="mt-8 w-full">
      <h3 className="text-[20px] font-medium mb-3 relative z-10">
        Recently Reviewed
      </h3>
      <div className="relative flex items-center w-full">
        <div className="flex flex-row gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {reviews?.slice().reverse().slice(0, 10).map((movie) => (
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

export default RecentlyReviewedRow;