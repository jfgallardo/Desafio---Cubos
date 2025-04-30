import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Movie } from '@repo/core';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class MoviesProvider {
  constructor(private readonly prisma: PrismaProvider) {}

  async list(page: number, pageSize: number, filters: any = {}) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const prismaFilters = this.buildPrismaFilters(filters);

    Logger.log(`Filtros: ${JSON.stringify(prismaFilters)}`);

    const [movies, total] = await Promise.all([
      this.prisma.movie.findMany({
        where: prismaFilters,
        skip,
        take,
      }),
      this.prisma.movie.count({
        where: prismaFilters,
      }),
    ]);

    return {
      movies,
      total,
    };
  }

  async create(movie: Movie) {
    const movieData = await this.prisma.movie.create({
      data: movie,
    });

    return movieData;
  }

  async getById(id: string): Promise<Movie> {
    const movie = (await this.prisma.movie.findUnique({
      where: {
        id,
      },
    })) as Movie;

    if (!movie) {
      throw new NotFoundException('Filme não encontrado.');
    }

    return movie;
  }

  async update(id: string, update: Movie) {
    const movie = (await this.prisma.movie.findUnique({
      where: {
        id,
      },
    })) as Movie;

    if (!movie) {
      throw new NotFoundException('Filme não encontrado.');
    }

    await this.prisma.movie.update({
      where: {
        id,
      },
      data: update,
    });

    return movie;
  }

  async delete(id: string) {
    const movie = (await this.prisma.movie.findUnique({
      where: {
        id,
      },
    })) as Movie;

    if (!movie) {
      throw new NotFoundException('Filme não encontrado.');
    }

    await this.prisma.movie.delete({
      where: {
        id,
      },
    });

    return movie;
  }

  private buildPrismaFilters(filters: Record<string, any>) {
    const prismaWhere: Record<string, any> = {};

    for (const key in filters) {
      const value = filters[key];

      if (value === undefined || value === null || value === '') {
        continue;
      }

      if (key === 'runtimeMinutesRange') {
        prismaWhere['runtimeMinutes'] = {
          gte: value[0],
          lte: value[1],
        };
        continue;
      }

      if (
        key === 'releaseDateRange' &&
        Array.isArray(value) &&
        value.length === 2
      ) {
        prismaWhere['releaseDate'] = {
          gte: value[0],
          lte: value[1],
        };
        continue;
      }

      const arrayFields = [
        'genres',
        'writers',
        'cast',
        'productionCompanies',
        'languages',
        'tags',
      ];

      if (arrayFields.includes(key) && Array.isArray(value)) {
        prismaWhere[key] = {
          hasSome: value,
        };
        continue;
      }

      prismaWhere[key] = {
        contains: value,
        mode: 'insensitive',
      };
    }

    return prismaWhere;
  }
}
