import UICustomNotification from "@/components/shared/ui-custom-notification";
import axios from "axios";
import { toast } from "react-toastify";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export interface MovieDetails {
  title: string;
  originalTitle?: string;
  synopsis: string;
  description?: string;
  releaseDate?: Date;
  runtimeMinutes: number;
  genres: string[];
  director: string;
  writers: string[];
  cast: string[];
  productionCompanies: string[];
  languages: string[];
  countryOfOrigin: string;
  rating: number;
  parentalGuidance: string;
  posterUrl: string;
  backdropUrl?: string;
  trailerUrl?: string;
  budget?: number;
  revenue?: number;
  tags?: string[];
}

export async function getMovieDetailsByName(
  movieName: string,
): Promise<MovieDetails | null> {
  try {
    const searchResponse = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: movieName,
      },
    });

    if (searchResponse.data.results.length === 0) {
      toast.error(UICustomNotification, {
        data: {
          title: "Película no encontrada",
          content: "Prencha os dados manualmente",
        },
        ariaLabel: "Unexpected error",
        theme: "colored",
      });

      return null;
    }

    const movie = searchResponse.data.results[0];
    const movieId = movie.id;

    const [detailsResponse, creditsResponse, videosResponse] =
      await Promise.all([
        axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
          params: { api_key: TMDB_API_KEY },
        }),
        axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits`, {
          params: { api_key: TMDB_API_KEY },
        }),
        axios.get(`${TMDB_BASE_URL}/movie/${movieId}/videos`, {
          params: { api_key: TMDB_API_KEY },
        }),
      ]);

    const details = detailsResponse.data;
    const credits = creditsResponse.data;
    const videos = videosResponse.data;

    const movieDetails: MovieDetails = {
      title: details.title,
      originalTitle: details.original_title,
      synopsis: details.overview,
      description: details.tagline || undefined,
      releaseDate: details.release_date
        ? new Date(details.release_date)
        : undefined,
      runtimeMinutes: details.runtime || 0,
      genres: details.genres.map((g: any) => g.name),
      director:
        credits.crew.find((person: any) => person.job === "Director")?.name ||
        "",
      writers: credits.crew
        .filter((person: any) => person.department === "Writing")
        .map((writer: any) => writer.name),
      cast: credits.cast.slice(0, 5).map((actor: any) => actor.name),
      productionCompanies: details.production_companies.map((p: any) => p.name),
      languages: details.spoken_languages.map((l: any) => l.name),
      countryOfOrigin: details.production_countries[0]?.name || "",
      rating: Math.round(details.vote_average * 10),
      parentalGuidance: details.adult ? "R" : "PG-13",
      posterUrl: details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : "",
      backdropUrl: details.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${details.backdrop_path}`
        : undefined,
      trailerUrl: videos.results.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube",
      )
        ? `https://www.youtube.com/watch?v=${videos.results.find((v: any) => v.type === "Trailer" && v.site === "YouTube").key}`
        : undefined,
      budget: details.budget || undefined,
      revenue: details.revenue || undefined,
      tags: details.genres.map((g: any) => g.name),
    };

    return movieDetails;
  } catch (error) {
    toast.error(UICustomNotification, {
      data: {
        title: "Erro ao buscar a película",
        content: "Prencha os dados manualmente",
      },
      ariaLabel: "Unexpected error",
      theme: "colored",
    });
    return null;
  }
}
