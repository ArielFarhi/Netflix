import React, { useState } from "react";
import HomeFooter from "../components/HomeFooter";
import Navbar from "../components/Navbar";
import { MoviePage } from "./MoviePage.jsx"; 
import NewFilm from "../components/NewFilm";
import PopularPrograms from "../components/Popular";
import MostViewedFilm from "../components/MostViewedFilm";
import RecommendedFilm from "../components/RecommendedFilm";
import TopRating from "../components/TopRating";
import AnimatedRow from "../components/AnimatedRow";
import MyList from "../components/MyList";
import { usePrograms } from "../api/programData";

function Movie() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const {
    data: popularPrograms,
    isLoading,
    error,
  } = usePrograms({ query: "popular", type: "movie" });

  const randomHeroMovie =
    popularPrograms?.[Math.floor(Math.random() * (popularPrograms?.length || 1))];

  const heroImage = randomHeroMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${randomHeroMovie.backdrop_path}`
    : "/Hero.png";

  return (
    <div className="max-w-screen min-h-screen bg-[#141414] text-white overflow-x-hidden relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div
        className="relative h-[90vh] w-full bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(20,20,20,1), rgba(20,20,20,0.2)), url(${heroImage})`,
        }}
      >
        <div className="pl-8 sm:pl-16 md:pl-24 lg:pl-32 max-w-2xl text-left">
          <p className="text-lg font-bold tracking-widest text-[#e50914] mb-1">
            N <span className="text-white">SERIES</span>
          </p>

          <div
            className="text-white font-extrabold text-[2.8rem] sm:text-[4rem] leading-[1] tracking-wider"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            {randomHeroMovie?.title?.split(" ").map((word, i) => (
              <div key={i} className="uppercase">
                {word}
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-snug max-w-md">
            {randomHeroMovie?.overview}
          </p>

          <button className="mt-6 flex items-center gap-2 px-5 py-2 bg-gray-300 bg-opacity-20 hover:bg-opacity-40 text-white text-sm font-medium rounded-md transition">
            <img src="/Info.png" alt="info" className="w-4 h-4" />
            More Info
          </button>
        </div>
      </div>

      <div className="relative z-10 px-3 sm:px-10 lg:px-20 space-y-12 pt-5">
        <RecommendedFilm setSelectedMovie={setSelectedMovie} type="movie" />
        <NewFilm setSelectedMovie={setSelectedMovie} type="movie" />
        <PopularPrograms setSelectedMovie={setSelectedMovie} type="movie" />
        <MostViewedFilm setSelectedMovie={setSelectedMovie} type="movie" />
        <TopRating setSelectedMovie={setSelectedMovie} type="movie" />
        <AnimatedRow setSelectedMovie={setSelectedMovie} type="movie" />
        <MyList setSelectedMovie={setSelectedMovie} type="movie" />
      </div>

      {selectedMovie && (
        <MoviePage
          movie={selectedMovie}
          isOpen={true}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <HomeFooter />
    </div>
  );
}

export default Movie;
