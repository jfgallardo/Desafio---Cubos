import { Module } from '@nestjs/common';
import { UserProvider } from './users.provider';
import { DbModule } from 'src/db/db.module';
import { UserController } from './users.controller';

@Module({
  imports: [DbModule],
  providers: [UserProvider],
  controllers: [UserController],
})
export class UserModule {}
