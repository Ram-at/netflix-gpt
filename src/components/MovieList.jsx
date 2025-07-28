import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-4 sm:px-6 py-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white py-2">{title}</h1>
      
      <div className="flex overflow-x-auto no-scrollbar">
        <div className="flex space-x-3 py-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
