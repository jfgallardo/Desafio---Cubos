import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaProvider } from 'src/db/prisma.provider';
import { MailerService } from 'src/services/mail.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaProvider,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.log('Filmes com estreia prevista para amanhã...');

    const now = new Date();
    const tomorrow = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
    );

    const startOfTomorrow = new Date(
      Date.UTC(
        tomorrow.getUTCFullYear(),
        tomorrow.getUTCMonth(),
        tomorrow.getUTCDate(),
        0,
        0,
        0,
      ),
    );
    const endOfTomorrow = new Date(
      Date.UTC(
        tomorrow.getUTCFullYear(),
        tomorrow.getUTCMonth(),
        tomorrow.getUTCDate(),
        23,
        59,
        59,
        999,
      ),
    );

    this.logger.log(`Start: ${startOfTomorrow.toISOString()}`);
    this.logger.log(`End: ${endOfTomorrow.toISOString()}`);

    const movies = await this.prisma.movie.findMany({
      where: {
        releaseDate: {
          gte: startOfTomorrow,
          lt: endOfTomorrow,
        },
        emailSent: false,
      },
    });

    for (const movie of movies) {
      const user = await this.prisma.user.findFirst();

      if (user?.email) {
        await this.mailerService.sendMailReleaseDate(user.email, movie.title);
        this.logger.log(
          `E-mail enviado para ${user.email} sobre a estreia de ${movie.title}`,
        );

        await this.prisma.movie.update({
          where: { id: movie.id },
          data: { emailSent: true },
        });
      }
    }
  }
}
