"use client";
import UIInput from "@/components/form/ui-input";
import UIButton from "@/components/shared/ui-button";
import { IconFilterCog, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ListFilms from "../list-films";
import useStoreMovies from "@/stores/movies";
import { useEffect, useState } from "react";
import UIModal from "@/components/shared/ui-modal";
import FiltersFilms from "../filters-films";
import { MovieFilters } from "@/actions/types/movies";
import { buildQueryParams } from "@/utils/helper";

interface SearchForm {
  name: string;
}

const initialFilters: MovieFilters = {
  genres: [],
  director: "",
  cast: [],
  writers: [],
  languages: [],
  countryOfOrigin: "",
  parentalGuidance: [],
  rating: 0,
  tags: [],
  runtimeMinutesRange: { min: 0, max: 0 },
  releaseDateRange: { min: new Date(), max: new Date() },
};

export default function DashboardView() {
  const router = useRouter();
  const { fetchMovies } = useStoreMovies();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<MovieFilters>(initialFilters);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SearchForm>();

  const name = watch("name");

  useEffect(() => {
    if (!name || name.trim() === "") {
      fetchMovies({
        page: 1,
        pageSize: 10,
        query: {},
      });
    }
  }, [name]);

  const onSubmit = async (data: SearchForm) => {
    if (data.name.trim() === "") return;
    await fetchMovies({
      page: 1,
      pageSize: 10,
      query: {
        title: data.name,
        originalTitle: data.name,
      },
    });
  };

  const onClose = () => setIsOpen(false);

  const clearFilters = async () => {
    setFilters(initialFilters);
    onClose();

    await fetchMovies({
      page: 1,
      pageSize: 10,
      query: {},
    });
  };

  const applyFilters = async () => {
    onClose();
    const params = buildQueryParams(filters);
    await fetchMovies({
      page: 1,
      pageSize: 10,
      query: {
        ...params,
      },
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap md:flex-nowrap gap-4 items-center justify-center md:justify-end w-full p-4 transition-all duration-300 ease-in-out">
        <form className="w-full md:w-96">
          <UIInput<SearchForm>
            register={register}
            value="name"
            placeholder="Pesquise por nome do filme"
            icon={
              <IconSearch
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleSubmit(onSubmit)()}
              />
            }
            onKey={() => handleSubmit(onSubmit)()}
          />
        </form>
        <UIButton
          color="soft"
          className="w-1/3 md:w-auto"
          onClick={() => setIsOpen(true)}
        >
          Filtros
        </UIButton>

        <UIButton
          color="primary"
          className="w-1/2 md:w-auto"
          onClick={() => router.push("/dashboard/movie")}
        >
          Adicionar Filme
        </UIButton>
      </div>

      <ListFilms />
      <UIModal
        isOpen={isOpen}
        onClose={onClose}
        title="Filtros"
        footer={
          <>
            <UIButton color="soft" onClick={clearFilters}>
              <div className="flex items-center gap-2">
                <IconTrash />
                Limpiar Filtros
              </div>
            </UIButton>
            <UIButton color="primary" onClick={applyFilters}>
              <div className="flex items-center gap-2">
                <IconFilterCog />
                Aplicar Filtros
              </div>
            </UIButton>
          </>
        }
      >
        <FiltersFilms filters={filters} setFilters={setFilters} />
      </UIModal>
    </div>
  );
}
