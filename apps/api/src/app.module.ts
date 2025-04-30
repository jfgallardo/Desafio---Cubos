import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    UserModule,
    MoviesModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
})
export class AppModule {}
