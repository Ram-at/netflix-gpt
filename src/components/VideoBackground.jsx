import { useSelector } from "react-redux";

import useTrailerVideo from "../hooks/useTrailerVideo";

export const VideoBackground = ({ movieId }) => {
  useTrailerVideo(movieId);
  const trailerVideos = useSelector((store) => store.movie.trailerVideo);

  // Prevent rendering until data is available
  if (!trailerVideos || !trailerVideos.key) return null;

  return (
    <div>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailerVideos.key}?autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        className="w-full aspect-video"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
