import React from "react";
import lang from "../utils/languageConstatns";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
    const langkey = useSelector(store => store.config.lang)
    
  return (
   <div className="pt-[20%] flex justify-center items-center">
  <form
    action=""
    className="w-full max-w-2xl bg-black backdrop-blur-md p-6 rounded-xl grid grid-cols-12 gap-4 shadow-2xl"
  >
    {/* Input Field */}
    <input
      type="text"
      placeholder={ lang[langkey].GptSearchPlaceholder}
      className="col-span-9 px-5 py-3 rounded-lg bg-white/10 text-white placeholder-white/21 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
    />

    {/* Search Button */}
    <button
      type="submit"
      className="col-span-3 px-4 py-3 rounded-lg bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-150"
    >
     { lang[langkey].search}
    </button>
  </form>
</div>

  );
};

export default GptSearchBar;
