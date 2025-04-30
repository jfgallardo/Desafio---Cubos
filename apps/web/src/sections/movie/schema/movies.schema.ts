import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, { message: "Campo obrigatório" }),
  originalTitle: z.string().optional(),
  synopsis: z.string().min(1, { message: "Campo obrigatório" }),
  description: z.string().optional(),
  releaseDate: z.union([z.string(), z.date()]).optional(),
  runtimeMinutes: z.number().min(1, { message: "Campo obrigatório" }),
  genres: z.string().min(1, { message: "Campo obrigatório" }),
  director: z.string().min(1, { message: "Campo obrigatório" }),
  writers: z.string().min(1, { message: "Campo obrigatório" }),
  cast: z.string().min(1, { message: "Campo obrigatório" }),
  productionCompanies: z.string().min(1, { message: "Campo obrigatório" }),
  languages: z.string().min(1, { message: "Campo obrigatório" }),
  countryOfOrigin: z.string().min(1, { message: "Campo obrigatório" }),
  rating: z.number().min(0, { message: "Campo obrigatório" }),
  parentalGuidance: z.string().min(1, { message: "Campo obrigatório" }),
  posterUrl: z.string().optional(),
  backdropUrl: z.string().optional(),
  trailerUrl: z.string().optional(),
  revenue: z.number().optional(),
  tags: z.string().optional(),
});

export type FormMovie = z.infer<typeof schema>;
