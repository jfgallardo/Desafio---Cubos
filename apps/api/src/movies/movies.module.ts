import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { MoviesController } from './movies.controller';
import { MoviesProvider } from './movies.provider';

@Module({
  imports: [DbModule],
  controllers: [MoviesController],
  providers: [MoviesProvider],
})
export class MoviesModule {}
