import React, { useRef } from "react";
import lang from "../utils/languageConstatns";
import { useSelector } from "react-redux";
import openai from "../utils/openai"; // Make sure this is correctly configured
import { API_OPTIONS } from "../utils/constants"; // Assuming this is defined

const GptSearchBar = () => {
  const langkey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // TMDB movie search helper
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  // GPT search handler
  const handleGptSearchClick = async () => {
    const query = searchText.current?.value?.trim();
    if (!query) return;

    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: "${query}". Only give me names of 5 movies, comma separated. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

    try {
      const gptResults = await openai.chat.completions.create({
        model: "gpt-4o", // change to gpt-4o if available
        messages: [{ role: "user", content: gptQuery }],
      });

      const movieString = gptResults.choices?.[0]?.message?.content;
      if (!movieString) {
        console.error("No response from GPT");
        return;
      }

      const gptMovies = movieString.split(",").map((movie) => movie.trim());

      const promiseArray = gptMovies.map(searchMovieTMDB);
      const tmdbResults = await Promise.all(promiseArray);

      console.log("TMDB Results:", tmdbResults); // You can pass this to a state for display
    } catch (error) {
      console.error("GPT or TMDB API Error:", error);
    }
  };

  return (
    <div className="pt-[20%] flex justify-center items-center">
      <form
        className="w-full max-w-2xl bg-black backdrop-blur-md p-6 rounded-xl grid grid-cols-12 gap-4 shadow-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Input Field */}
        <input
          type="text"
          ref={searchText}
          placeholder={lang[langkey].GptSearchPlaceholder}
          className="col-span-9 px-5 py-3 rounded-lg bg-white/10 text-white placeholder-white/21 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="col-span-3 px-4 py-3 rounded-lg bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-150"
          onClick={handleGptSearchClick}
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
