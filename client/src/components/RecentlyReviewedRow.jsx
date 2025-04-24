import React from "react";
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

  const reviewed = reviews?.slice().reverse().slice(0, 10) || [];

  return (
    <section className="mt-8 w-full">
      <h3 className="text-[20px] font-medium mb-3 relative z-10">
        Recently Reviewed
      </h3>
      <div className="relative flex items-center w-full">
        <div className="flex flex-row gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {reviewed.map((review) => {
            const posterUrl = review.posterPath
              ? `https://image.tmdb.org/t/p/w500${review.posterPath}`
              : "/fallback-poster.png";

            const title = review.title || "Untitled";

            return (
              <img
                key={review._id}
                src={posterUrl}
                alt={title}
                className="min-w-[218px] h-[123px] object-cover rounded cursor-pointer transition-transform hover:scale-105"
                onClick={() =>
                  setSelectedMovie({
                    id: review.movieId,
                    type: review.type || "movie",
                  })
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentlyReviewedRow;