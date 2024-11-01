import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { UserService } from './user.service';
import { MailService } from '../../utils/service/mail/mail.service';

@Processor('mail')
export class UserProcessor {
    private readonly logger = new Logger(UserProcessor.name);

    constructor(private readonly mailService: MailService, private readonly userService: UserService) {}

    @Process('send-otp')
    async handleTranscode(job: Job) {
        this.logger.debug('Starting sending otp...');
        const { userId, email } = job.data;
        console.log("Email: ", email, " User Id: ", userId);
        const otp = await this.userService.generateOtp(userId);
        await this.mailService.sendOtpEmail(email, otp);
        this.logger.debug('Done sending otp...');
    }
}