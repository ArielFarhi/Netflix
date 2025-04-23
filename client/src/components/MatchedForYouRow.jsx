import React, { useEffect, useState } from "react";
import { getRecommendations } from "../api/recommendByAI";
import LoadingScreen from "./ui/LoadingScreen";
import { useGetReviews } from "../api/reviewData"; 
import { usePrograms } from "../api/programData";

const MatchedForYouRow = ({ setSelectedMovie }) => {
  const { data: userReviews, isLoading: loadingReviews } = useGetReviews();
  const { data: allPrograms, isLoading: loadingPrograms } = usePrograms({ query: "all" });

  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    if (!loadingReviews && !loadingPrograms && userReviews && allPrograms) {
      const result = getRecommendations({
        userReviews,
        allPrograms,
      });
      setRecommended(result);
    }
  }, [userReviews, allPrograms, loadingReviews, loadingPrograms]);

  if (loadingReviews || loadingPrograms) return <LoadingScreen />;
  if (!recommended.length) return null;

  return (
    <section className="mt-8 w-full">
      <h3 className="text-[20px] font-medium mb-3 relative z-10">Top Matches For You</h3>
      <div className="relative flex items-center w-full">
        <div className="flex flex-row gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {recommended.map((program) => (
            <img
              key={program.id}
              src={`https://image.tmdb.org/t/p/w500${program.poster_path}`}
              alt={program.title}
              className="min-w-[218px] h-[123px] object-cover rounded cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedMovie(program.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchedForYouRow;