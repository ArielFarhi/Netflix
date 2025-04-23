import React, { useState } from "react";
import SelectMenu from "../components/SelectMenu.jsx";
import Navbar from "../components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { useSearchContext } from "../context/Search";
import { useSearchPrograms } from "../api/programData";

function DiscoverContent() {
  const { searchQuery } = useSearchContext();

  const [language, setLanguage] = useState("English");
  const [sortOption, setSortOption] = useState("Suggested for you");
  const [ageRating, setAgeRating] = useState("All");

  const languages = ["English", "Spanish", "French"];
  const sortOptions = ["Suggested for you", "A-Z", "Z-A"];
  const ageRatings = [
    { label: "All Ages", value: "All" },
    { label: "Kids (G)", value: "G" },
    { label: "Teens (PG)", value: "PG" },
    { label: "Teens+ (PG-13)", value: "PG-13" },
    { label: "Adults (R)", value: "R" },
    { label: "Restricted (NC-17)", value: "NC-17" },
  ];

  const {
    data: programs,
    isLoading,
    isError,
  } = useSearchPrograms({
    query: searchQuery,
    language,
    sortBy: sortOption,
    ageRating,
  });

  if (isLoading) return <div className="text-white p-5">Loading content...</div>;
  if (isError) return <div className="text-red-500 p-5">Something went wrong</div>;

  return (
    <div className="bg-black min-h-screen w-screen overflow-x-hidden">
      <Navbar />

      <div className="px-6 mt-5 w-full flex flex-row justify-between items-center flex-wrap text-white">
        <h1 className="px-3 font-semibold text-3xl">Discover</h1>

        <div className="mt-5 flex flex-wrap gap-4 items-center">
          <p className="font-light">Filter your results</p>

          <SelectMenu
            options={languages}
            selectedOption={language}
            onSelect={setLanguage}
          />

          <SelectMenu
            options={ageRatings.map(opt => opt.label)}
            selectedOption={ageRatings.find(opt => opt.value === ageRating)?.label}
            onSelect={(selectedLabel) => {
              const selected = ageRatings.find(opt => opt.label === selectedLabel);
              setAgeRating(selected?.value || "All");
            }}
          />

          <div className="flex flex-row justify-center items-center gap-1">
            <span className="text-gray-200 text-sm">Sort by</span>
            <SelectMenu
              options={sortOptions}
              selectedOption={sortOption}
              onSelect={setSortOption}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center items-center gap-4 mt-24 px-5">
        {programs?.length > 0 ? (
          programs.map((program) => (
            <div className="w-52 h-auto" key={uuidv4()}>
              <img
                src={`https://image.tmdb.org/t/p/w500${program.poster_path}`}
                alt={program.title}
                className="min-w-[218px] h-[123px] object-cover rounded cursor-pointer"
              />
            </div>
          ))
        ) : (
          <div className="text-white">No results found</div>
        )}
      </div>
    </div>
  );
}

export default DiscoverContent;