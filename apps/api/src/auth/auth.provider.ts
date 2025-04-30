import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserWithoutPasswordDto } from './dto/user-without-password.dto';
import { nanoid } from 'nanoid';
import { MailerService } from 'src/services/mail.service';

@Injectable()
export class AuthProvider {
  constructor(
    private readonly prisma: PrismaProvider,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signIn(
    identifier: string,
    password: string,
  ): Promise<{ access_token: string; user: UserWithoutPasswordDto }> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { name: identifier }],
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Usuário não encontrado com o identificador fornecido.',
      );
    }

    if (!(await this.comparePasswords(password, user.password))) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    const payload = { sub: user.id, username: user.name };

    const { password: _password, ...userWithoutPassword } = user;

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword,
    };
  }

  async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<{ access_token: string; user: UserWithoutPasswordDto }> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Usuário não encontrado com o id fornecido.',
      );
    }

    if (!(await this.comparePasswords(oldPassword, user.password))) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    const hashedPassword = await this.hashedPassword(newPassword);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    const payload = { sub: user.id, username: user.name };

    return { access_token: await this.jwtService.signAsync(payload), user };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Usuário não encontrado com o email fornecido.',
      );
    }

    if (user) {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      const resetToken = nanoid(64);
      await this.prisma.passwordReset.create({
        data: {
          token: resetToken,
          email: user.email,
          expiresAt,
        },
      });
      await this.mailerService.sendPasswordResetEmail(email, resetToken);
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const passwordReset = await this.prisma.passwordReset.findFirst({
      where: {
        token,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!passwordReset) {
      throw new UnauthorizedException(
        'Token de redefinição de senha não encontrado.',
      );
    }

    const hashedPassword = await this.hashedPassword(newPassword);

    const user = await this.prisma.user.findFirst({
      where: {
        email: passwordReset.email,
      },
    });

    if (!user) {
      throw new InternalServerErrorException(
        'Usuário não encontrado com o email fornecido.',
      );
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  private comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
