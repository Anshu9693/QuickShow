import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import BlurCircle from "./BlurCircle";
import { PlayCircle } from "lucide-react";

// Helper: convert YouTube link to embed format
const getEmbedUrl = (url) => {
  const videoId = new URL(url).searchParams.get("v");
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&autoplay=1`;
};

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px]">
        Trailers
      </p>

      {/* Video Player */}
      <div className="relative pb-[56.25%] mt-6 mx-auto max-w-[960px] h-0">
        <BlurCircle top="-100px" right="-100px" />
        <iframe
          src={getEmbedUrl(currentTrailer.videoUrl)}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            className="relative hover:translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer group"
            onClick={() => {
              setCurrentTrailer(trailer);
            }}
          >
            <img
              src={trailer.image}
              alt="trailer thumbnail"
              className="rounded-lg w-full h-full object-cover brightness-75"
            />
            <PlayCircle
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2 text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
