import React from "react";

export const SearchBar = ({ currentWord, updateWord, clear }) => {
  return (
    // w-full  → take the full width of the parent
    // hover:scale-105 → grow slightly when hovered
    <div className="flex justify-center will-change-transform w-full transition-all duration-300 hover:scale-105">
      {/* w-full → stretch the gradient border to full width */}
      <div className="rounded-3xl p-[5px] w-full">
        {/* w-full  → make the white box fill the row
            p-3 sm:p-5 → less padding on mobile, more on larger screens */}
        <div className="flex items-center bg-white rounded-[22px] p-3 sm:p-5 gap-3 w-full">
          {/* shrink-0 → stop the icon from being squished */}
          <img src="search.svg" alt="Search Icon" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />

          {/* w-full   → input stretches to fill remaining space
              text-sm  → small text on mobile (14px)
              sm:text-2xl → bigger text on sm screens and up (≥640px) */}
          <input
            type="text"
            placeholder="Find any movie you want"
            value={currentWord}
            onChange={(event) => updateWord(event.target.value)}
            className="w-full text-sm sm:text-2xl outline-none bg-transparent"
          />

          {currentWord && (
            // shrink-0 → keep the ✖ button from being squished
            <button
              onClick={clear}
              className="shrink-0 text-black will-change-transform transition-all duration-300 hover:scale-120 cursor-pointer"
            >
              ✖
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
