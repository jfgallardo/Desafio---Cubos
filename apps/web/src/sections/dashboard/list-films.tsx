"use client";
import UICard from "@/components/movie/ui-card";
import UINoMoviesFound from "@/components/movie/ui-noMoviesFound";
import UIPagination from "@/components/movie/ui-pagination";
import UILoadingScreen from "@/components/shared/ui-loadingScreen";
import useStoreMovies from "@/stores/movies";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ListFilms() {
  const { movies, fetchMovies, loading } = useStoreMovies();
  const router = useRouter();
  useEffect(() => {
    fetchMovies({ page: 1, pageSize: 10 });
  }, []);

  if (loading) {
    return (
      <UILoadingScreen text="Analisando todos os filmes... Em breve sua lista estará pronta!" />
    );
  }

  if (movies.length === 0) {
    return <UINoMoviesFound />;
  }

  const handlePageChange = (newPage: number) => {
    fetchMovies({ page: newPage, pageSize: 10 });
  };

  return (
    <div className="h-[95vh] md:h-[100vh] overflow-auto md:overflow-visible">
      <div className="flex  items-center justify-center mt-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {movies.map((movie) => (
            <UICard
              key={movie.id}
              movie={movie}
              onClick={() => {
                router.push(`/dashboard/movie/${movie.id}`);
              }}
            />
          ))}
        </div>
      </div>
      <UIPagination onPageChange={handlePageChange} />
    </div>
  );
}
