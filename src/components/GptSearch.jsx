import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import { BACKGROUND_IMAGE } from '../utils/constants';

 const GptSearch = () => {
  return (
    <div>
          <div className="absolute">
        <img
          src={BACKGROUND_IMAGE}
          alt="background"
        />
        </div>
        <GptSearchBar/>
        <GptMovieSuggestion/>
    </div>
  )
}
export default GptSearch;
