import { Movie } from "@repo/core";

export type MovieCreateInput = Omit<Movie, "id" | "createdAt" | "updatedAt">;
export type MovieUpdateInput = Omit<Movie, "createdAt" | "updatedAt">;

export type MovieFilters = {
  genres?: string[];
  director?: string;
  cast?: string[];
  writers?: string[];
  languages?: string[];
  countryOfOrigin?: string;
  parentalGuidance?: string[];
  rating?: number;
  tags?: string[];
  runtimeMinutesRange?: { min: number; max: number };
  releaseDateRange?: { min: Date; max: Date };
};
