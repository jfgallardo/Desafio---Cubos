import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesProvider } from './movies.provider';
import { AuthGuard } from 'src/auth/auth.guard';
import { Movie } from '@repo/core';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MovieEntity } from './entities/movie.entity';

@ApiTags('movies')
@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesProvider: MoviesProvider) {}

  @ApiOperation({ summary: 'Listar filmes' })
  @ApiResponse({
    status: 200,
    description: 'Filmes encontrados',
    type: [MovieEntity],
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async list(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Query('query') query: string,
  ) {
    const parsedQuery = query ? JSON.parse(query) : {};

    const parsedPage = parseInt(page, 10) || 1;
    const parsedPageSize = parseInt(pageSize, 10) || 10;
    const result = await this.moviesProvider.list(
      parsedPage,
      parsedPageSize,
      parsedQuery,
    );
    return {
      movies: result.movies,
      total: result.total,
      page,
      pageSize,
    };
  }

  @ApiOperation({ summary: 'Cadastrar um filme' })
  @ApiResponse({
    status: 201,
    description: 'Filme criado com sucesso',
    type: MovieEntity,
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() movie: Movie) {
    return this.moviesProvider.create(movie);
  }

  @ApiOperation({ summary: 'Obter um filme por id' })
  @ApiResponse({
    status: 200,
    description: 'Filme encontrado',
    type: MovieEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.moviesProvider.getById(id);
  }

  @ApiOperation({ summary: 'Atualizar um filme' })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() update: Movie) {
    return this.moviesProvider.update(id, update);
  }

  @ApiOperation({ summary: 'Excluir um filme' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.moviesProvider.delete(id);
  }
}
