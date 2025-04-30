import { create } from "zustand";
import { Movie } from "@repo/core";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "@/actions/movies";
import { MovieCreateInput, MovieUpdateInput } from "@/actions/types/movies";

type StoreMovies = {
  movies: Movie[];
  movie: Movie | null;
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  fetchMovies: (params: {
    page?: number;
    pageSize?: number;
    query?: Record<string, any>;
  }) => Promise<void>;
  addMovie: (movie: MovieCreateInput) => Promise<void>;
  fetchMovie: (id: Movie["id"]) => Promise<void>;
  removeMovie: (id: Movie["id"]) => Promise<void>;
  editMovie: (movie: MovieUpdateInput) => Promise<void>;
};

const useStoreMovies = create<StoreMovies>()((set) => ({
  movies: [],
  movie: null,
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  fetchMovies: async ({
    page = 1,
    pageSize = 10,
    query = {},
  }: {
    page?: number;
    pageSize?: number;
    query?: Record<string, any>;
  }) => {
    set({ loading: true });
    const data = await getMovies({ page, pageSize, query });
    set({
      movies: data.movies,
      total: parseInt(data.total, 10),
      page: parseInt(data.page, 10),
      loading: false,
    });
  },
  fetchMovie: async (id: Movie["id"]) => {
    set({ loading: true });
    const data = await getMovie(id);
    set({
      movie: data,
      loading: false,
    });
  },
  addMovie: async (movie) => {
    const newMovie = await createMovie(movie);
    set((state) => ({
      movies: [...state.movies, newMovie],
    }));
  },
  removeMovie: async (id: Movie["id"]) => {
    await deleteMovie(id);
    set((state) => ({
      movies: state.movies.filter((m) => m.id !== id),
    }));
  },
  editMovie: async (movie) => {
    const updatedMovie = await updateMovie(movie);
    set((state) => ({
      movies: state.movies.map((m) =>
        m.id === updatedMovie.id ? updatedMovie : m,
      ),
    }));
  },
}));

export default useStoreMovies;
