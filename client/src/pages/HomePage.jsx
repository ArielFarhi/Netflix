// import React, { useState } from "react"; 
// import HomeFooter from "../components/HomeFooter"; 
// import Navbar from "../components/Navbar"; 
// import MovieDialog from "./MovieDialog.jsx"; 
// import NewReleasesRow from "../components/NewReleasesRow"; 
// import TrendingRow from "../components/TrendingRow"; 
// import TopViewsRow from "../components/TopViewRow"; 
// import MatchedForYouRow from "../components/MatchedForYouRow"; 
// import  SuggestedForYouRow from "../components/SuggestedForYouRow"; 
// import AnimatedRow from "../components/AnimatedRow"; 
// import MyListRow from "../components/MyListRow"; 
// import { usePrograms } from "../api/programData"; 
// import RecentlyReviewedRow from "@/components/RecentlyReviewedRow"; 

// function Home() {
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   const {
//     data: popularPrograms,
//     isLoading,
//     error,
//   } = usePrograms({ query: "popular", type: "movie" });

//   const randomHeroMovie =
//     popularPrograms?.[Math.floor(Math.random() * (popularPrograms?.length || 1))];

//   const heroImage = randomHeroMovie?.backdrop_path
//     ? `https://image.tmdb.org/t/p/original${randomHeroMovie.backdrop_path}`
//     : `/Hero.png`;

//   return (
//     <div className="max-w-screen min-h-screen bg-[#141414] text-white overflow-x-hidden relative">
//       <div className="fixed top-0 left-0 w-full z-50">
//         <Navbar />
//       </div>
//       <div
//         className="relative h-[90vh] w-full bg-cover bg-center flex items-center"
//         style={{
//           backgroundImage: `linear-gradient(to top, rgba(20,20,20,1), rgba(20,20,20,0.2)), url(${heroImage})`,
//         }}
//       >
//         <div className="pl-8 sm:pl-16 md:pl-24 lg:pl-32 max-w-2xl text-left">
//           <p className="text-lg font-bold tracking-widest text-[#e50914] mb-1">
//             N <span className="text-white">SERIES</span>
//           </p>

//           <div
//             className="text-white font-extrabold text-[2.8rem] sm:text-[4rem] leading-[1] tracking-wider"
//             style={{ fontFamily: "Anton, sans-serif" }}
//           >
//             {randomHeroMovie?.title?.split(" ").map((word, i) => (
//               <div key={i} className="uppercase">
//                 {word}
//               </div>
//             ))}
//           </div>

//           <p className="mt-4 text-sm sm:text-base text-gray-300 leading-snug max-w-md">
//             {randomHeroMovie?.overview}
//           </p>

//           <button className="mt-6 flex items-center gap-2 px-5 py-2 bg-gray-300 bg-opacity-20 hover:bg-opacity-40 text-white text-sm font-medium rounded-md transition">
//             <img src="/Info.png" alt="info" className="w-4 h-4" />
//             More Info
//           </button>
//         </div>
//       </div>
//       <div className="relative z-10 px-3 sm:px-10 lg:px-20 space-y-12 pt-5">
//         <MatchedForYouRow setSelectedMovie={setSelectedMovie} />
//         <NewReleasesRow setSelectedMovie={setSelectedMovie} />
//         <TrendingRow setSelectedMovie={setSelectedMovie} />
//         <TopViewsRow setSelectedMovie={setSelectedMovie} />
//         <SuggestedForYouRow setSelectedMovie={setSelectedMovie} />
//         <AnimatedRow setSelectedMovie={setSelectedMovie} />
//         <RecentlyReviewedRow setSelectedMovie={setSelectedMovie} />
//         <MyListRow setSelectedMovie={setSelectedMovie} />
//       </div>
//       {selectedMovie && (
//         <MovieDialog
//           movie={selectedMovie}
//           isOpen={true}
//           onClose={() => setSelectedMovie(null)}
//         />
//       )}
//       <HomeFooter />
//     </div>
//   );
// }

// export default Home;


import React, { useState }      from "react";
import Navbar                   from "../components/Navbar";
import HomeFooter               from "../components/HomeFooter";
import MovieDialog              from "./MovieDialog.jsx";

import MatchedForYouRow         from "../components/MatchedForYouRow";
import NewReleasesRow           from "../components/NewReleasesRow";
import TopViewsRow              from "../components/TopViewRow";
import RecentlyReviewedRow      from "@/components/RecentlyReviewedRow";
import SuggestedForYouRow       from "../components/SuggestedForYouRow";
import AnimatedRow              from "../components/AnimatedRow";
import TrendingRow              from "../components/TrendingRow";
import MyListRow                from "../components/MyListRow";

import { usePrograms }          from "../api/programData";
import { useUserAuth }          from "../context/Authentication.jsx";

function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { user } = useUserAuth();

  const { data: popularPrograms = [] } = usePrograms({
    query: "popular",
    type: "movie",
  });

  const randomHero =
    popularPrograms[Math.floor(Math.random() * (popularPrograms.length || 1))] ?? {};

  const heroImage = randomHero.backdrop_path
    ? `https://image.tmdb.org/t/p/original${randomHero.backdrop_path}`
    : "/Hero.png";

  return (
    <div className="max-w-screen min-h-screen bg-[#141414] text-white overflow-x-hidden relative">
      {/* ───── Navbar ───── */}
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
        <MatchedForYouRow    setSelectedMovie={setSelectedMovie} />
        <NewReleasesRow      setSelectedMovie={setSelectedMovie} />
        <TopViewsRow         setSelectedMovie={setSelectedMovie} />
        <RecentlyReviewedRow setSelectedMovie={setSelectedMovie} />
        <SuggestedForYouRow  setSelectedMovie={setSelectedMovie} />
        <AnimatedRow         setSelectedMovie={setSelectedMovie} />
        <TrendingRow
          genreId={99}
          title="Documentaries"
          setSelectedMovie={setSelectedMovie}
        />
        <MyListRow
          setSelectedMovie={setSelectedMovie}
          userId={user?._id}
        />
      </div>

      {selectedMovie && (
        <MovieDialog
          movie={selectedMovie}
          isOpen
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <HomeFooter />
    </div>
  );
}

export default Home;
