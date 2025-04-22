import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HomeFooter from "../components/HomeFooter";
import ProgramCard from "../components/ProgramCard";
import { usePrograms } from "../hooks/usePrograms";

const NewAndPopular = () => {
  const [page, setPage] = useState(1);
  const [programs, setPrograms] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading } = usePrograms({ query: "newest", page });

  useEffect(() => {
    if (data?.length) {
      setPrograms((prev) => [...prev, ...data]);
    } else {
      setHasMore(false);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.scrollHeight &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className="bg-[#141414] text-white min-h-screen overflow-x-hidden">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {programs.map((program) => (
            <ProgramCard key={program._id || program.id} program={program} />
          ))}
        </div>

        {isLoading && <p className="text-center mt-6">Loading more...</p>}
        {!hasMore && (
          <p className="text-center mt-6 text-gray-400">
            You've reached the end.
          </p>
        )}
      </div>

      <HomeFooter />
    </div>
  );
};

export default NewAndPopular;
