import React from "react";
import { useGetAnimatedPrograms } from "../api/programData";
import { v4 as uuid } from "uuid";
import LoadingScreen from "./ui/LoadingScreen";

const Animation = ({ setSelectedMovie, type }) => {
  const {
    data: animatedItems,
    isLoading,
    error,
  } = useGetAnimatedPrograms({ type });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div>Error loading animated {type === "tv" ? "TV shows" : "movies"}.</div>
    );
  }

  return (
    <div className="mt-8 w-full">
      <h3 className="font-medium text-[20px] mb-3 relative z-10">
        Animated {type === "tv" ? "TV Shows" : "Movies"}
      </h3>
      <div className="relative flex items-center w-full">
        <div className="w-full flex flex-row gap-4 overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {animatedItems?.map((item) => (
            <img
              key={uuid()}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="min-w-[218px] h-[123px] inline-block object-cover rounded cursor-pointer"
              onClick={() => setSelectedMovie(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Animation;