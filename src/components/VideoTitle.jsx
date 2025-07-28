

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[30%] px-20 absolute text-white bg-gradient-to-b from-black">
      <h1 className="text-5xl font-bold ">{title}</h1>
      <p className="py-6 text-lg w-1/3 ">{overview}</p>
      <div>
        <button className="bg-white text-black p-4 px-16 text-xl bg-opacity-50 rounded-lg hover:bg-gray-200 cursor-pointer"> Play</button>
        <button className="bg-gray-300 m-4 text-black p-4 px-16 text-xl bg-opacity-50 rounded-lg cursor-pointer hover:bg-amber-50">More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
