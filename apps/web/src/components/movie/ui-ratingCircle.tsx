import React from "react";

type RatingCircleProps = {
  rating: number;
};

export default function UIRatingCircle({ rating }: RatingCircleProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (rating / 100) * circumference;

  return (
    <div className="relative w-[98px] h-[98px]">
      <svg
        className="w-full h-full rotate-[-90deg]"
        style={{
          backdropFilter: "blur(4px)",
          background: "rgba(18, 17, 19, 0.5)",
          borderRadius: "9999px",
        }}
      >
        <circle
          className="text-gray-300"
          stroke="rgba(255, 255, 255, 0.27)"
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="49"
          cy="49"
        />
        <circle
          className="text-yellow-400"
          stroke="rgba(255, 224, 0, 1)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="49"
          cy="49"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white uppercase font-bold leading-none">
        <span
          style={{
            fontFamily: "Montserrat",
            fontSize: "20px",
          }}
        >
          {rating}
        </span>
        <span
          style={{
            fontFamily: "Montserrat",
            fontSize: "12px",
          }}
        >
          %
        </span>
      </div>
    </div>
  );
}
