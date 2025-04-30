import { ApiProperty } from '@nestjs/swagger';

export class MovieEntity {
  @ApiProperty({
    example: 'cma0vfe4s0001tbz29vdl5nkh',
    description: 'ID de filme',
  })
  id: string;

  @ApiProperty({ example: 'Inception', description: 'Título do filme' })
  title: string;

  @ApiProperty({
    example: 'Inception (Original)',
    description: 'Título  original',
    required: false,
  })
  originalTitle?: string;

  @ApiProperty({
    example: 'A mind-bending thriller...',
    description: 'Sinopse',
  })
  synopsis: string;

  @ApiProperty({
    example: 'Descrição mais detalhada e resumida',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: '2010-07-16T00:00:00.000Z',
    required: false,
    type: String,
    description: 'Data de lançamento',
  })
  releaseDate?: Date;

  @ApiProperty({ example: 148, description: 'Duração em minutos' })
  runtimeMinutes: number;

  @ApiProperty({ example: ['Sci-Fi', 'Thriller'], description: 'Gêneros' })
  genres: string[];

  @ApiProperty({ example: 'Christopher Nolan', description: 'Diretor' })
  director: string;

  @ApiProperty({ example: ['Jonathan Nolan'], description: 'Roteiristas' })
  writers: string[];

  @ApiProperty({
    example: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
    description: 'Elenco principal',
  })
  cast: string[];

  @ApiProperty({ example: ['Warner Bros.'], description: 'Produtores' })
  productionCompanies: string[];

  @ApiProperty({
    example: ['English', 'Japanese'],
    description: 'Idiomas disponíveis',
  })
  languages: string[];

  @ApiProperty({ example: 'USA', description: 'País de origem' })
  countryOfOrigin: string;

  @ApiProperty({
    example: 87,
    description: 'Pontuação de classificação (0-100)',
  })
  rating: number;

  @ApiProperty({ example: 'PG-13', description: 'Classificação etária' })
  parentalGuidance: string;

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'URL do pôster',
  })
  posterUrl: string;

  @ApiProperty({
    example: 'https://example.com/backdrop.jpg',
    required: false,
    description: 'URL da imagem de fundo',
  })
  backdropUrl?: string;

  @ApiProperty({
    example: 'https://youtube.com/trailer',
    required: false,
    description: 'URL do trailer',
  })
  trailerUrl?: string;

  @ApiProperty({
    example: 160000000,
    required: false,
    description: 'Orçamento em dólares',
  })
  budget?: number;

  @ApiProperty({
    example: 800000000,
    required: false,
    description: 'Receita em dólares',
  })
  revenue?: number;

  @ApiProperty({
    example: ['dream', 'subconscious'],
    required: false,
    description: 'Tags',
  })
  tags?: string[];

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    type: String,
    description: 'Data de criação',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-02T00:00:00.000Z',
    type: String,
    description: 'Data de atualização',
  })
  updatedAt: Date;
}
