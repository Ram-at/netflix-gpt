import { IMAGE_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-40 sm:w-44 md:w-48 lg:w-52 pr-2 ml-1 transform hover:scale-105 transition duration-300 ease-in-out">
      <img
        src={IMAGE_CDN + posterPath}
        alt="Movie Poster"
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default MovieCard;
