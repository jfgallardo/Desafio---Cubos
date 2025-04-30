import { Body, Controller, Post } from '@nestjs/common';
import { UserProvider } from './users.provider';
import { User } from '@repo/core';

@Controller('user')
export class UserController {
  constructor(private readonly usersProvider: UserProvider) {}

  @Post('create')
  async create(@Body() user: User): Promise<{ message: string }> {
    return this.usersProvider.create(user);
  }
}
