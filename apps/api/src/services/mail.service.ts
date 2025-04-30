import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailerService implements OnModuleInit {
  private transporter: Transporter;

  async onModuleInit() {
    const testAccount = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log('Nodemailer test account created.');
  }

  /* async sendMail(to: string, subject: string, text: string, html?: string) {
    if (!this.transporter) {
      throw new Error('Transporter not initialized');
    }

    const message = {
      from: '"Cubos Movies" <julio.gallardo@gmail.com>',
      to,
      subject,
      text,
      html,
    };

    const info = await this.transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return {
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    };
  } */

  async sendPasswordResetEmail(to: string, token: string) {
    if (!this.transporter) {
      throw new Error('Transporter not initialized');
    }

    const resetLink = `http://localhost:3002/auth/reset-password/${token}`;

    const message = {
      from: '"Cubos Movies" <julio.gallardo@gmail.com>',
      to,
      subject: 'Reset your password',
      text: `Click here to reset your password: ${resetLink}`,
      html: `<a href="${resetLink}">Click here to reset your password</a>`,
    };

    const info = await this.transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return {
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    };
  }

  async sendMailReleaseDate(to: string, titleMovie: string) {
    if (!this.transporter) {
      throw new Error('Transporter not initialized');
    }

    const message = {
      from: '"Cubos Movies" <julio.gallardo@gmail.com>',
      to,
      subject: 'Release date for your movie',
      text: `Your movie "${titleMovie}" has a release date in the next 24 hours!`,
      html: `<p>Your movie "${titleMovie}" has a release date in the next 24 hours!</p>`,
    };

    const info = await this.transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return {
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    };
  }
}
