import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('mail')
export class UserProcessor {
    private readonly logger = new Logger(UserProcessor.name);

    @Process('send-otp')
    handleTranscode(job: Job) {
        this.logger.debug('Starting sending otp...');
        this.logger.debug(job.data);
        this.logger.debug('Done sending otp...');
    }
}
