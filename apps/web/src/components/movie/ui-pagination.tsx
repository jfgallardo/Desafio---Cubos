import useStoreMovies from "@/stores/movies";
import { useMemo } from "react";
import UIButton from "../shared/ui-button";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

type PaginationProps = {
  onPageChange: (newPage: number) => void;
};

export default function UIPagination({ onPageChange }: PaginationProps) {
  const { page, pageSize, total } = useStoreMovies();

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total, pageSize],
  );

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <UIButton
        color="primary"
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IconArrowNarrowLeft />
      </UIButton>

      <div className="hidden md:flex space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <UIButton
              color="primary"
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={page === pageNumber}
              className={`px-3 py-1`}
            >
              {pageNumber}
            </UIButton>
          );
        })}
      </div>

      <div className="md:hidden px-3 py-1 rounded bg-yellow-400 text-black font-bold">
        {page}
      </div>

      <UIButton
        color="primary"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IconArrowNarrowRight />
      </UIButton>
    </div>
  );
}
