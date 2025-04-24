import React from "react";
import { usePrograms } from "../api/programData"; 
import { v4 as uuid } from "uuid";
import LoadingScreen from "./ui/LoadingScreen"; 

const NewReleasesRow = ({ setSelectedMovie, type, title = "New on Netflix" }) => {
  const { data: newReleases, isLoading, error } = usePrograms({
    query: "newest",
    type,
  });

  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error fetching content.</div>;

  return (
    <section className="mt-8 w-full">
      <h3 className="text-[20px] font-medium mb-3 relative z-10">
        {title}
      </h3>
      <div className="relative flex items-center w-full">
        <div className="flex gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {newReleases?.map((movie) => (
            <img
              key={uuid()}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="min-w-[218px] h-[123px] object-cover rounded cursor-pointer transition-transform hover:scale-105"
              onClick={() =>
                setSelectedMovie({
                  id: movie.id,
                  type: movie.type || movie.media_type || type || "movie",
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewReleasesRow;