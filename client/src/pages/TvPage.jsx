import React, { useState } from "react";
import HomeFooter from "../components/HomeFooter";
import Navbar from "../components/Navbar";
import MovieDialog from "./MovieDialog";
import NewFilm from "../components/NewFilm";
import Popular from "../components/Popular";
import MostViewedFilm from "../components/MostViewedFilm";
import RecommendedFilm from "../components/RecommendedFilm";
import TopRating from "../components/TopRating";
import Animation from "../components/Animation";
import SavedFilm from "../components/SavedFilm";
import { usePrograms } from "../api/programData";
import { useUserAuth } from "../context/Authentication.jsx";

const TvPage = () => {
    const { user } = useUserAuth();
    const [selectedTvShow, setSelectedTvShow] = useState(null);

    const {
        data: popularTvShows,
        isLoading,
        error,
    } = usePrograms({ query: "popular", type: "tv" });

    const randomIndex = Math.floor(
        Math.random() * (popularTvShows?.length || 0)
    );
    const randomHeroShow = popularTvShows?.[randomIndex];

    return (
        <div className="max-w-screen min-h-screen bg-[#141414] text-white overflow-x-hidden relative">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            <div
                className="relative h-[90vh] w-full bg-cover bg-center flex items-center"
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(20,20,20,1), rgba(20,20,20,0.2)), url(${randomHeroShow?.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${randomHeroShow.backdrop_path}`
                        : `/Hero.png`
                        })`,
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
                        {randomHeroShow?.name?.split(" ").map((word, index) => (
                            <div key={index} className="uppercase">
                                {word}
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm sm:text-base text-gray-300 leading-snug max-w-md">
                        {randomHeroShow?.overview}
                    </p>
                    <button className="mt-6 flex items-center gap-2 px-5 py-2 bg-gray-300 bg-opacity-20 hover:bg-opacity-40 text-white text-sm font-medium rounded-md transition">
                        <img src="/Info.png" alt="info" className="w-4 h-4" />
                        More Info
                    </button>
                </div>
            </div>
            <div className="relative z-10 px-3 sm:px-10 lg:px-20 space-y-12 pt-5">
                <RecommendedFilm setSelectedMovie={setSelectedTvShow} type="tv" />
                <NewFilm setSelectedMovie={setSelectedTvShow} type="tv" />
                <Popular setSelectedMovie={setSelectedTvShow} type="tv" />
                <MostViewedFilm setSelectedMovie={setSelectedTvShow} type="tv" />
                <TopRating setSelectedMovie={setSelectedTvShow} type="tv" />
                <Animation setSelectedMovie={setSelectedTvShow} type="tv" />
                <SavedFilm
                    setSelectedMovie={setSelectedTvShow}
                    userId={user?._id}
                    type="tv"
                />
            </div>
            {selectedTvShow && (
                <MovieDialog
                    movie={selectedTvShow}
                    isOpen={true}
                    onClose={() => setSelectedTvShow(null)}
                    type="tv"
                />
            )}
            <HomeFooter />
        </div>
    );
};

export default TvPage;