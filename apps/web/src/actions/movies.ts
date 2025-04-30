import axiosInstance from "@/utils/axios";
import { MovieCreateInput, MovieUpdateInput } from "./types/movies";

export const getMovies = async ({
  page = 1,
  pageSize = 10,
  query = {},
}: {
  page?: number;
  pageSize?: number;
  query?: Record<string, any>;
}) => {
  try {
    const response = await axiosInstance.get("/movies", {
      params: {
        page,
        pageSize,
        query: JSON.stringify(query),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMovie = async (movie: MovieCreateInput) => {
  try {
    const response = await axiosInstance.post("/movies", movie);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMovie = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/movies/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMovie = async (movie: MovieUpdateInput) => {
  try {
    const response = await axiosInstance.put(`/movies/${movie.id}`, movie);
    return response.data;
  } catch (error) {
    throw error;
  }
};
