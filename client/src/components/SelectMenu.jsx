import React, { useState } from "react";

function SelectMenu({ options, selectedOption, onSelect }) {
  const [open, setOpen] = useState(false);
  const handleSelect = (option) => {
    onSelect(option);
    setOpen(false);
  };
  return (
    <div className="relative w-40">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-8 px-4 flex justify-between items-center text-xs text-white bg-transparent border border-gray-600 rounded-md"
      >
        {selectedOption} <span className="ml-2">▼</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full mt-1 z-10 bg-black/80 text-white border border-gray-600 rounded shadow-lg max-h-32 overflow-y-auto">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className="p-2 text-xs hover:bg-gray-700 cursor-pointer custom-scrollbar"
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectMenu;