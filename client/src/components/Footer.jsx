import React, { useState } from "react";
import { Link } from "react-router";

function Footer() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  const availableLanguages = [
    "English",
    "French",
    "Spanish",
    "German",
    "Chinese",
    "Arabic",
    "Hindi",
  ];

  return (
    <footer className="w-full h-1/2 bg-black/70 text-white py-8 mt-auto relative z-20">
      <div className="container mx-auto px-4">
        Questions? Call 1-844-505-2993
        <div className="mt-3 flex flex-wrap justify-between">
          <div className="w-full flex flex-col gap-4 md:w-1/4 mb-4 md:mb-0">
            {["FAQ", "Privacy", "Ad Choices"].map((text, i) => (
              <Link key={i} to="/" className="cursor-pointer font-light text-base underline">
                {text}
              </Link>
            ))}
            <div className="relative w-40">
              <button
                className="w-full h-10 border border-gray-600 rounded-md bg-transparent text-white px-4 flex justify-between items-center"
                onClick={() => setDropdownVisible((prev) => !prev)}
              >
                {currentLanguage} <span className="ml-2">▼</span>
              </button>
              {dropdownVisible && (
                <ul className="absolute top-full left-0 w-full bg-black/80 text-white rounded shadow-lg mt-1 border border-gray-600 z-10 max-h-32 overflow-y-auto">
                  {availableLanguages.map((lang, idx) => (
                    <li
                      key={idx}
                      className="p-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setCurrentLanguage(lang);
                        setDropdownVisible(false);
                      }}
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="h-32"></div>
          </div>
          <div className="w-full flex flex-col gap-4 md:w-1/4 mb-4 md:mb-0">
            <Link to="/" className="cursor-pointer text-gray-400 hover:text-white underline">
              Help Center
            </Link>
            <Link to="/" className="cursor-pointer text-gray-400 hover:text-white underline">
              Cookie Preferences
            </Link>
          </div>
          <div className="w-full flex flex-col gap-4 md:w-1/4 mb-4 md:mb-0">
            <Link to="/" className="cursor-pointer text-gray-400 hover:text-white underline">
              Netflix Shop
            </Link>
            <Link to="/" className="cursor-pointer text-gray-400 hover:text-white underline">
              Corporate Information
            </Link>
          </div>
          <div className="w-full flex flex-col gap-4 md:w-1/4 mb-4 md:mb-0">
            <Link to="/" className="cursor-pointer text-gray-400 hover:text-white underline">
              Terms of Use
            </Link>
            <Link to="/" className="cursor-pointer text-gray-400 hover:text-white underline">
              Do not sell my
              <div>personal information</div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;