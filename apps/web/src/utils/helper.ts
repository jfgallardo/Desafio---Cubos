import { MovieFilters } from "@/actions/types/movies";
import { formatDateRange } from "./date";

export function getErrorMessage(error: any): string {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Erro inesperado. Tente novamente."
  );
}

export function isValidUrl(url: string): boolean {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(url);
}

export function buildQueryParams(filters: MovieFilters) {
  const params: any = {};

  if (filters.genres?.length) params.genres = filters.genres;
  if (filters.director) params.director = filters.director;
  if (filters.cast?.length) params.cast = filters.cast;
  if (filters.writers?.length) params.writers = filters.writers;
  if (filters.languages?.length) params.languages = filters.languages;
  if (filters.countryOfOrigin) params.countryOfOrigin = filters.countryOfOrigin;
  if (filters.parentalGuidance?.length)
    params.parentalGuidance = filters.parentalGuidance;
  if (filters.tags?.length) params.tags = filters.tags;
  if (filters.rating) params.ratingMin = filters.rating;

  if (filters.runtimeMinutesRange?.min || filters.runtimeMinutesRange?.max) {
    params.runtimeMinutesRange = [
      filters.runtimeMinutesRange.min ?? 0,
      filters.runtimeMinutesRange.max ?? 1000,
    ];
  }

  if (filters.releaseDateRange?.min || filters.releaseDateRange?.max) {
    const formattedDates = formatDateRange(
      filters.releaseDateRange.min,
      filters.releaseDateRange.max
    );
    params.releaseDateRange = formattedDates;
  }

  return params;
}
