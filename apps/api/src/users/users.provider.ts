import { Injectable } from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';
import * as bcrypt from 'bcrypt';
import { User } from '@repo/core';

@Injectable()
export class UserProvider {
  constructor(private readonly prisma: PrismaProvider) {}

  async create(user: User): Promise<{ message: string }> {
    const hashedPassword: string = await this.hashedPassword(user.password);

    await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    return { message: 'Usuário criado com sucesso!' };
  }

  private async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
