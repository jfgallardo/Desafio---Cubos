import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MailerService } from 'src/services/mail.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [TasksService, MailerService],
})
export class TasksModule {}
