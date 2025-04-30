export default interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  synopsis: string;
  description?: string;
  releaseDate?: Date;
  runtimeMinutes: number; // Duración en minutos
  genres: string[];
  director: string;
  writers: string[];
  cast: string[]; // Principales actores
  productionCompanies: string[]; // Estudios de producción
  languages: string[]; // Idiomas disponibles
  countryOfOrigin: string;
  rating: number; // Ej: 70
  parentalGuidance: string; // Ej: "PG-13", "R", "G"
  posterUrl: string; // URL del póster
  backdropUrl?: string; // Imagen de fondo
  trailerUrl?: string;
  budget?: number; // Presupuesto en dólares
  revenue?: number; // Ganancias
  tags?: string[]; // Tags o palabras clave
  createdAt: Date;
  updatedAt: Date;
}
