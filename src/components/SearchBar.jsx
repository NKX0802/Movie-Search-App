import React from "react";

export const SearchBar = ({ currentWord, updateWord, clear }) => {
  return (
    <div className="flex justify-center w-full transition-all duration-300 hover:scale-105">
      <div className="rounded-3xl p-[5px] w-fit">
        <div className="flex items-center bg-white rounded-[22px] p-5 gap-3 w-fit">
          <img src="search.svg" alt="Search Icon" className="w-6 h-6" />

          <input
            type="text"
            placeholder="Find any movie you want"
            value={currentWord}
            onChange={(event) => updateWord(event.target.value)}
            className="w-100 text-2xl outline-none bg-transparent"
          />

          {currentWord && (
            <button
              onClick={clear}
              className="text-black transition:all duration-300 hover:scale-120 cursor-pointer"
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
