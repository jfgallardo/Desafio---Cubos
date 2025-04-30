"use client";

import UINoMoviesFound from "@/components/movie/ui-noMoviesFound";
import UIRatingCircle from "@/components/movie/ui-ratingCircle";
import UIButton from "@/components/shared/ui-button";
import UILoadingScreen from "@/components/shared/ui-loadingScreen";
import UIModal from "@/components/shared/ui-modal";
import UITooltip from "@/components/shared/ui-tooltip";
import useStoreMovies from "@/stores/movies";
import { fCurrency } from "@/utils/format-number";
import {
  IconLoader3,
  IconPencil,
  IconTrashFilled,
  IconX,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  id: string;
};

export default function DetailsMovieView({ id }: Props) {
  const { fetchMovie, removeMovie, movie, loading } = useStoreMovies();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    fetchMovie(id);
  }, []);

  if (loading) {
    return (
      <UILoadingScreen text="Analisando el filme solicitado... Em breve sua informação estará pronta!" />
    );
  }

  if (!movie) {
    return <UINoMoviesFound />;
  }

  const onDeleteMovie = async () => {
    setRemoveLoading(true);
    await removeMovie(movie.id);
    toast.success("Filme excluído com sucesso!");
    setRemoveLoading(false);
    router.push("/dashboard");
  };

  return (
    <>
      <div className="h-[90vh] overflow-auto">
        <div className="mt-20 w-[90%] mx-auto space-y-8">
          <div
            className="relative rounded-lg overflow-hidden h-[400px] md:h-[700px]"
            style={{
              backgroundImage: `linear-gradient(90deg, #121113 0%, rgba(18,17,19,0.9) 60%, rgba(18,17,19,0.9) 100%), url(${movie.backdropUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-ui-mauve-dark-700 rounded-full p-1">
              <UITooltip id="IconClose" content="Fechar" place="top">
                <IconX
                  className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
                  color="white"
                  onClick={() => router.push("/dashboard")}
                />
              </UITooltip>
            </div>

            <div className="absolute top-8 left-2 right-2 md:top-12 md:left-20 md:right-20 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 z-10">
              <div className="space-y-1">
                <h1 className="text-2xl md:text-4xl font-bold text-white truncate">
                  {movie.title}
                </h1>
                <p className="text-sm md:text-lg text-gray-300 truncate">
                  {movie.originalTitle}
                </p>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <UIButton color="soft" onClick={() => setIsOpen(true)}>
                  <div className="flex items-center gap-1 md:gap-2">
                    <IconTrashFilled className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm">Deletar</span>
                  </div>
                </UIButton>
                <UIButton
                  color="primary"
                  onClick={() =>
                    router.push(`/dashboard/movie/${movie.id}/edit`)
                  }
                >
                  <div className="flex items-center gap-1 md:gap-2">
                    <IconPencil className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm">Editar</span>
                  </div>
                </UIButton>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-ui-purple-100 dark:bg-black/60 p-4 md:p-8 z-10 max-h-[220px] md:max-h-full overflow-auto">
              <div className="flex flex-col md:grid md:grid-cols-3 md:gap-6 dark:text-white">
                <div className="flex justify-center md:justify-start">
                  <div
                    className="rounded shadow-lg w-24 h-36 md:w-64 md:h-96 flex-shrink-0"
                    style={{
                      backgroundImage: `url(${movie.posterUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>

                <div className="mt-4 md:mt-0 space-y-2">
                  <h2 className="text-lg md:text-2xl font-semibold">Sinopse</h2>
                  <p className="text-sm md:text-base">{movie.synopsis}</p>
                  {movie.description && (
                    <div className="text-sm md:text-base">
                      <span className="font-semibold">Descrição: </span>
                      {movie.description}
                    </div>
                  )}
                  <div className="text-sm md:text-base">
                    <span className="font-semibold">Gêneros: </span>
                    {movie.genres.join(", ")}
                  </div>
                </div>

                <div className="mt-4 md:mt-0 space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="block font-medium text-sm md:text-base">
                        Classificação:
                      </span>
                      <span className="text-sm md:text-base">
                        {movie.parentalGuidance}
                      </span>
                    </div>
                    <div>
                      <span className="block font-medium text-sm md:text-base">
                        Origem:
                      </span>
                      <span className="text-sm md:text-base">
                        {movie.countryOfOrigin}
                      </span>
                    </div>
                    <UIRatingCircle rating={movie.rating} />
                  </div>
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="block font-medium text-sm md:text-base">
                        Lanzamento:
                      </span>
                      {movie.releaseDate && (
                        <p className="text-sm md:text-base">
                          {new Date(movie.releaseDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <span className="block font-medium text-sm md:text-base">
                        Duração:
                      </span>
                      <p className="text-sm md:text-base">
                        {movie.runtimeMinutes} min
                      </p>
                    </div>
                    <div>
                      <span className="block font-medium text-sm md:text-base">
                        Revenue:
                      </span>
                      <p className="text-sm md:text-base">
                        {fCurrency(movie.revenue, { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div>
                      <span className="font-medium text-sm md:text-base">
                        Director:
                      </span>{" "}
                      <span className="text-sm md:text-base">
                        {movie.director}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-sm md:text-base">
                        Writers:
                      </span>{" "}
                      <span className="text-sm md:text-base">
                        {movie.writers.join(", ")}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-sm md:text-base">
                        Cast:
                      </span>{" "}
                      <span className="text-sm md:text-base">
                        {movie.cast.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[400px] md:h-[600px] bg-black rounded-lg overflow-hidden">
            <h2 className="text-2xl font-bold text-white p-4">Trailer</h2>
            {movie.trailerUrl ? (
              <iframe
                src={movie.trailerUrl.replace("watch?v=", "embed/")}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[calc(100%-56px)]"
              />
            ) : (
              <p className="text-white p-4">Trailer no disponible</p>
            )}
          </div>
        </div>
      </div>
      <UIModal
        isOpen={isOpen}
        onClose={onClose}
        title="Aviso!"
        footer={
          <div className="flex items-center gap-2">
            <UIButton color="soft" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-2">
                <IconX />
                Fechar
              </div>
            </UIButton>
            <UIButton
              color="primary"
              onClick={onDeleteMovie}
              disabled={removeLoading}
            >
              <div className="flex items-center gap-2">
                {removeLoading ? (
                  <IconLoader3 className="animate-spin" />
                ) : (
                  <IconTrashFilled />
                )}
                Excluir
              </div>
            </UIButton>
          </div>
        }
      >
        <div>
          Tem certeza de que deseja excluir o filme selecionado? Esta ação é
          irreversível.
        </div>
      </UIModal>
    </>
  );
}
