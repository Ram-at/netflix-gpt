import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  //This is made so that if movie is there on the store then don't make an api call this is made on every fetch so i have made here only but we can make this only every api call (this is memoization)
  const moviesInStore = useSelector(store => store.movie.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addNowPlayingMovies(json.results));
  };
  useEffect(() => {
     //This is made so that if movie is there on the store then don't make an api call
   !moviesInStore && getNowPlayingMovies();
  }, []);
};
export default useNowPlayingMovies;
