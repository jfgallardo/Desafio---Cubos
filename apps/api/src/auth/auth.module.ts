import { Module } from '@nestjs/common';
import { AuthProvider } from './auth.provider';
import { DbModule } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { MailerService } from 'src/services/mail.service';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthProvider, MailerService],
  controllers: [AuthController],
})
export class AuthModule {}
