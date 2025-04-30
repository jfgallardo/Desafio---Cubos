import { Movie } from "@repo/core";
import { useState } from "react";
import UIRatingCircle from "./ui-ratingCircle";
import UIButton from "../shared/ui-button";

type Props = {
  movie: Movie;
  onClick?: () => void;
};

export default function UICard({ movie, onClick }: Props) {
  const [showTags, setShowTags] = useState(false);

  const handleToggleTags = () => {
    if (window.innerWidth < 768) {
      setShowTags((prev) => !prev);
    } else {
      onClick?.();
    }
  };

  const handleDetails = () => {
    onClick?.();
  };

  return (
    <div
      onClick={handleToggleTags}
      className="text-white w-[235px] h-[355px] bg-cover bg-center rounded-lg overflow-hidden relative transition-transform duration-300 ease-in-out hover:cursor-pointer group md:hover:scale-105"
      style={{
        backgroundImage: `url(${movie.posterUrl})`,
      }}
    >
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          showTags ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100 z-10`}
      >
        <UIRatingCircle rating={movie.rating} />
      </div>

      <UIButton
        color="soft"
        className={`md:hidden absolute top-2 right-4 text-white ${
          showTags ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100 z-10`}
        onClick={handleDetails}
      >
        <span className="text-xs md:text-sm">Detalhes</span>
      </UIButton>

      <div className="p-2 absolute bottom-0 flex items-center justify-center bg-ui-purple-100/50 dark:bg-black/50 w-full text-center flex flex-col space-y-1 text-black dark:text-white">
        <p
          className={`font-semibold text-lg transition-all duration-300 ${
            showTags ? "-translate-y-1" : ""
          } md:group-hover:-translate-y-1`}
        >
          {movie.originalTitle}
        </p>
        <p
          className={`transition-all duration-300 overflow-hidden text-sm ${
            showTags ? "opacity-100 max-h-[100px]" : "opacity-0 max-h-0"
          } md:group-hover:opacity-100 md:group-hover:max-h-[100px]`}
        >
          {movie.tags?.join(", ")}
        </p>
      </div>
    </div>
  );
}
