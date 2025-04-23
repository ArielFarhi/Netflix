import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HomeFooter from "../components/HomeFooter";
import MovieDialog from "./MovieDialog";
import NewFilm from "../components/NewFilm";

const NewAndPopular = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="max-w-screen min-h-screen bg-[#141414] text-white overflow-x-hidden relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="pt-24 px-6 sm:px-10 lg:px-20">
        <h1
          className="text-4xl font-extrabold tracking-wide uppercase mb-8"
          style={{ fontFamily: "Anton, sans-serif" }}
        >
          New & Popular
        </h1>
        <NewFilm setSelectedMovie={setSelectedMovie} type="movie" />
        <NewFilm setSelectedMovie={setSelectedMovie} type="tv" />
      </div>
      {selectedMovie && (
        <MovieDialog
          movie={selectedMovie}
          isOpen={true}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <HomeFooter />
    </div>
  );
};

export default NewAndPopular;
