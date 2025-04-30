"use client";
import UINoMoviesFound from "@/components/movie/ui-noMoviesFound";
import UILoadingScreen from "@/components/shared/ui-loadingScreen";
import useStoreMovies from "@/stores/movies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormMovie, schema } from "../schema/movies.schema";
import { MovieUpdateInput } from "@/actions/types/movies";
import UITooltip from "@/components/shared/ui-tooltip";
import { IconLink, IconLoader3, IconMovie, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import UIInput from "@/components/form/ui-input";
import UIButton from "@/components/shared/ui-button";
import UITextArea from "@/components/form/ui-text-area";
import UIImagePreview from "@/components/form/ui-image-preview";
import { toast } from "react-toastify";
import UICustomNotification from "@/components/shared/ui-custom-notification";

type Props = {
  id: string;
};

export default function EditMovieView({ id }: Props) {
  const { fetchMovie, editMovie, movie, loading } = useStoreMovies();
  const [loadingEdit, setLoadingEdit] = useState(false);
  const router = useRouter();

  const defaultValues = {
    title: movie?.title ?? "",
    originalTitle: movie?.originalTitle ?? "",
    synopsis: movie?.synopsis ?? "",
    description: movie?.description ?? "",
    releaseDate: movie?.releaseDate
      ? new Date(movie.releaseDate).toISOString().split("T")[0]
      : "",
    runtimeMinutes: movie?.runtimeMinutes ?? 0,
    genres: movie?.genres.join(", ") ?? "",
    director: movie?.director ?? "",
    writers: movie?.writers.join(", ") ?? "",
    cast: movie?.cast.join(", ") ?? "",
    productionCompanies: movie?.productionCompanies.join(", ") ?? "",
    languages: movie?.languages.join(", ") ?? "",
    countryOfOrigin: movie?.countryOfOrigin ?? "",
    rating: movie?.rating ?? 0,
    parentalGuidance: movie?.parentalGuidance ?? "",
    posterUrl: movie?.posterUrl ?? "",
    backdropUrl: movie?.backdropUrl ?? "",
    trailerUrl: movie?.trailerUrl ?? "",
    revenue: movie?.revenue ?? 0,
    tags: movie?.tags?.join(", ") ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    fetchMovie(id);
  }, []);

  useEffect(() => {
    if (movie) {
      reset(defaultValues);
    }
  }, [movie, reset]);

  useEffect(() => {
    const firstErrorEntry = Object.entries(errors)[0];
    if (firstErrorEntry) {
      const [fieldName, error] = firstErrorEntry;
      if (error?.message) {
        toast.error(UICustomNotification, {
          data: {
            title: fieldName,
            content: error.message,
          },
          ariaLabel: "Unexpected error",
          theme: "colored",
        });
      }
    }
  }, [errors]);

  if (loading) {
    return (
      <UILoadingScreen text="Analisando el filme solicitado... Em breve sua informação estará pronta!" />
    );
  }

  if (!movie) {
    return <UINoMoviesFound />;
  }

  const posterUrl = watch("posterUrl");
  const backdropUrl = watch("backdropUrl");
  const trailerUrl = watch("trailerUrl");

  const openTrailer = () => {
    if (!trailerUrl) return;
    window.open(trailerUrl, "_blank");
  };

  const onSubmit: SubmitHandler<FormMovie> = async (data) => {
    try {
      setLoadingEdit(true);
      const body: MovieUpdateInput = {
        id: movie.id,
        title: data.title,
        originalTitle: data.originalTitle,
        synopsis: data.synopsis,
        description: data.description,
        releaseDate: data.releaseDate ? new Date(data.releaseDate) : undefined,
        runtimeMinutes: data.runtimeMinutes,
        genres: data.genres.split(","),
        director: data.director,
        writers: data.writers.split(","),
        cast: data.cast.split(","),
        productionCompanies: data.productionCompanies.split(","),
        languages: data.languages.split(","),
        countryOfOrigin: data.countryOfOrigin,
        rating: data.rating,
        parentalGuidance: data.parentalGuidance,
        posterUrl: data.posterUrl || "",
        backdropUrl: data.backdropUrl,
        trailerUrl: data.trailerUrl,
        budget: 0,
        revenue: data.revenue,
        tags: data.tags?.split(","),
      };
      await editMovie(body);
      toast.success("Filme editado com sucesso!");
      router.push(`/dashboard/movie/${id}`);
    } catch (error) {
      toast.error(UICustomNotification, {
        data: {
          title: "Opa",
          content: error as string,
        },
        ariaLabel: "Unexpected error",
        theme: "colored",
      });
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <div className="h-[90vh] overflow-auto">
      <div className="flex items-center justify-center mt-20">
        <div className="w-[90%]  flex flex-col justify-center space-y-4 items-center bg-ui-mauve-300 dark:bg-ui-mauve-dark-300 p-4 rounded-md relative">
          <div className="absolute -top-3 -right-3 bg-ui-mauve-dark-700 rounded-full p-1">
            <UITooltip id="IconArrowBackUp" content="Fechar" place="top">
              <IconX
                className="w-8 h-8 cursor-pointer"
                color="white"
                onClick={() => router.push(`/dashboard/movie/${id}`)}
              />
            </UITooltip>
          </div>

          <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center dark:text-white">
              Editar Filme {movie.originalTitle}
            </h1>
            <p className="text-lg text-center text-gray-600 mt-2">
              Preencha as informações abaixo para editar o filme selecionado
            </p>
          </div>
          <form
            className="w-full space-y-4 p-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col md:flex-row items-center justify-end gap-4 ">
              <div className="w-full">
                <UIInput<FormMovie>
                  register={register}
                  value="title"
                  placeholder="Digite o nome da película"
                />
              </div>

              <UIButton
                color="primary"
                type="submit"
                disabled={loadingEdit}
                className="w-full md:w-md"
              >
                <div className="flex flex-row items-center justify-center gap-2 ">
                  Editar Filme
                  {loadingEdit ? (
                    <IconLoader3 className="animate-spin" />
                  ) : (
                    <IconMovie />
                  )}
                </div>
              </UIButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-stretch">
              <div className="space-y-4">
                <UIInput<FormMovie>
                  register={register}
                  value="originalTitle"
                  placeholder="Digite o nome original da película"
                  label="Nome original"
                />
                <UIInput<FormMovie>
                  register={register}
                  value="runtimeMinutes"
                  placeholder="Digite o tempo total da película"
                  label="Duração em minutos"
                  type="number"
                />
                <UIInput<FormMovie>
                  register={register}
                  value="releaseDate"
                  placeholder="Digite a data de lançamento da película"
                  label="Data de lançamento"
                  type="date"
                />

                <UIInput<FormMovie>
                  register={register}
                  value="trailerUrl"
                  placeholder="Digite a url do trailer da película"
                  label="Trailer"
                  icon={
                    <IconLink
                      className="w-6 h-6 cursor-pointer"
                      onClick={openTrailer}
                    />
                  }
                />
                <UIInput<FormMovie>
                  register={register}
                  value="countryOfOrigin"
                  placeholder="Digite o país de origem da película"
                  label="País de origem"
                />
                <UIInput<FormMovie>
                  register={register}
                  value="rating"
                  placeholder="Digite a classificação da película"
                  label="Classificação"
                  type="number"
                />
                <UIInput<FormMovie>
                  register={register}
                  value="parentalGuidance"
                  placeholder="Digite a orientação para adultos da película"
                  label="Orientação para adultos"
                />

                <UITextArea<FormMovie>
                  register={register}
                  value="director"
                  label="Diretor"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <UIInput<FormMovie>
                  register={register}
                  value="backdropUrl"
                  placeholder="Digite a url do backdrop da película"
                  label="Backdrop"
                />
                <UIImagePreview imageUrl={backdropUrl} />
                <UITextArea<FormMovie>
                  register={register}
                  value="genres"
                  label="Gêneros"
                  rows={2}
                />
                <UITextArea<FormMovie>
                  register={register}
                  value="productionCompanies"
                  label="Empresas de produção"
                  rows={2}
                />
                <UITextArea<FormMovie>
                  register={register}
                  value="languages"
                  label="Idiomas"
                  rows={2}
                />
                <UIInput<FormMovie>
                  register={register}
                  type="number"
                  value="revenue"
                  placeholder="Digite o valor de receita da película"
                  label="Receita"
                />
              </div>

              <div className="space-y-1.5">
                <UIInput<FormMovie>
                  register={register}
                  value="posterUrl"
                  placeholder="Digite a url do poster da película"
                  label="Poster"
                />
                <UIImagePreview imageUrl={posterUrl} />
              </div>

              <div className="space-y-1.5">
                <UITextArea<FormMovie>
                  register={register}
                  value="synopsis"
                  label="Resumo"
                />
                <UITextArea<FormMovie>
                  register={register}
                  value="description"
                  label="Descrição"
                />
                <UITextArea<FormMovie>
                  register={register}
                  value="writers"
                  label="Escritores"
                />

                <UITextArea<FormMovie>
                  register={register}
                  value="cast"
                  label="Atores principais"
                />

                <UITextArea<FormMovie>
                  register={register}
                  value="tags"
                  label="Tags"
                  rows={2}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
