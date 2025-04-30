"use client";
import { ReactNode } from "react";
import { Tooltip } from "react-tooltip";

type Props = {
  children: ReactNode;
  id: string;
  content: string;
  place?: "top" | "right" | "bottom" | "left";
};

export default function UITooltip({
  children,
  id,
  content,
  place = "bottom",
}: Props) {
  return (
    <>
      <a
        data-tooltip-id={id}
        data-tooltip-content={content}
        data-tooltip-place={place}
      >
        {children}
      </a>

      <Tooltip id={id} />
    </>
  );
}
