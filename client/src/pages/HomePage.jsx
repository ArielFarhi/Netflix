import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HomeFooter from "../components/HomeFooter";
import MovieDialog from "./MovieDialog.jsx";
import MatchedForYouRow from "../components/MatchedForYouRow";
import NewReleasesRow from "../components/NewReleasesRow";
import TopViewsRow from "../components/TopViewRow";
import RecentlyReviewedRow from "@/components/RecentlyReviewedRow";
import SuggestedForYouRow from "../components/SuggestedForYouRow";
import AnimatedRow from "../components/AnimatedRow";
import TrendingRow from "../components/TrendingRow";
import MyListRow from "../components/MyListRow";
import { usePrograms } from "../api/programData";
import { useUserAuth } from "../context/Authentication.jsx";

function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { user } = useUserAuth();

  const { data: movies = [], isLoading: loadingMovies } = usePrograms({
    query: "popular",
    type: "movie",
  });

  const { data: tvShows = [], isLoading: loadingTV } = usePrograms({
    query: "popular",
    type: "tv",
  });

  const moviesWithType = movies.map((item) => ({ ...item, type: "movie" }));
  const tvWithType = tvShows.map((item) => ({ ...item, type: "tv" }));

  const allPrograms = [...moviesWithType, ...tvWithType];

  const randomHero =
    allPrograms[Math.floor(Math.random() * (allPrograms.length || 1))] ?? {};

  const heroImage = randomHero.backdrop_path
    ? `https://image.tmdb.org/t/p/original${randomHero.backdrop_path}`
    : "/Hero.png";

  return (
    <div className="max-w-screen min-h-screen bg-[#141414] text-white overflow-x-hidden relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div
        className="relative h-[90vh] w-full bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            `linear-gradient(to top, rgba(20,20,20,1), rgba(20,20,20,0.2)), url(${heroImage})`,
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
            {randomHero.title?.split(" ").map((word, i) => (
              <div key={i} className="uppercase">{word}</div>
            ))}
          </div>
          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-snug max-w-md">
            {randomHero.overview}
          </p>
          <button
            className="mt-6 flex items-center gap-2 px-5 py-2 bg-gray-300 bg-opacity-20 hover:bg-opacity-40 text-white text-sm font-medium rounded-md transition"
          >
            <img src="/Info.png" alt="info" className="w-4 h-4" />
            More Info
          </button>
        </div>
      </div>

      <div className="relative z-10 px-3 sm:px-10 lg:px-20 space-y-12 pt-5">
        <MatchedForYouRow
          title="Matched To You"
          setSelectedMovie={setSelectedMovie}
          type="all"
        />
        <NewReleasesRow
          title="New on Netflix"
          setSelectedMovie={setSelectedMovie}
          type="all"
        />
        <TopViewsRow
          title="Top 10 movies in the U.S. Today"
          setSelectedMovie={setSelectedMovie}
          type="all"
        />
        <RecentlyReviewedRow
          title="Recently Reviewed"
          setSelectedMovie={setSelectedMovie}
          type="all"
        />
        <SuggestedForYouRow
          title="Suggested For You"
          setSelectedMovie={setSelectedMovie}
          type="all"
        />
        <AnimatedRow
          title="Animated Favorites"
          setSelectedMovie={setSelectedMovie}
          type="all"
        />
        <TrendingRow
          title="Documentaries"
          genreId={99}
          setSelectedMovie={setSelectedMovie}
          type="all"
        />
        <MyListRow
          setSelectedMovie={setSelectedMovie}
          userId={user?._id}
        />
      </div>

      {selectedMovie && (
        <MovieDialog
          movie={selectedMovie.id}
          type={selectedMovie.type || "movie"}
          isOpen
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <HomeFooter />
    </div>
  );
}

export default Home;