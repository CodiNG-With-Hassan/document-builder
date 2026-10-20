import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailer: MailerService) {}

  async sendWelcomeEmail(to: string, displayName?: string) {
    try {
      await this.mailer.sendMail({
        to,
        subject: 'Welcome',
        template: 'welcome',
        context: { displayName: displayName ?? to },
      });
    } catch (err) {
      this.logger.error(`Failed to send welcome email to ${to}`, err);
    }
  }
}
