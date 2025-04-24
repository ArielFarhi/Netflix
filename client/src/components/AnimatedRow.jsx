import React from "react";
import { useGetAnimatedPrograms } from "../api/programData";
import { v4 as uuid } from "uuid";
import LoadingScreen from "./ui/LoadingScreen";

const AnimatedRow = ({ setSelectedMovie, type, title = "Animated" }) => {
  const isAll = type === "all";

  const {
    data: animatedMovies = [],
    isLoading: loadingMovies,
    error: errorMovies,
  } = useGetAnimatedPrograms({ type: isAll ? "movie" : type });

  const {
    data: animatedTV = [],
    isLoading: loadingTV,
    error: errorTV,
  } = useGetAnimatedPrograms({ type: isAll ? "tv" : null });

  const animatedPrograms = isAll
    ? [...animatedMovies, ...animatedTV].map((item) => ({
        ...item,
        type: item.type || item.media_type || (item.name ? "tv" : "movie"),
      }))
    : animatedMovies;

  const isLoading = loadingMovies || (isAll && loadingTV);
  const error = errorMovies || (isAll && errorTV);

  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error loading animated content.</div>;

  return (
    <section className="mt-8 w-full">
      <h3 className="text-[20px] font-medium mb-3 relative z-10">{title}</h3>
      <div className="relative flex items-center w-full">
        <div className="flex flex-row gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {animatedPrograms.map((program) => (
            <img
              key={uuid()}
              src={`https://image.tmdb.org/t/p/w500${program.poster_path}`}
              alt={program.title || program.name}
              className="min-w-[218px] h-[123px] object-cover rounded cursor-pointer transition-transform hover:scale-105"
              onClick={() =>
                setSelectedMovie({
                  id: program.id,
                  type: program.type || "movie",
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedRow;