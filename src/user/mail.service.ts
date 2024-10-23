// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOGLE_SMPT_USERNAME,
                pass: process.env.GOOGLE_SMPT_PASSWORD,
            },
        });
    }

    async sendOtpEmail(to: string, otp: string): Promise<void> {
        const mailOptions = {
            from: '"Your Service" <your-email@example.com>',
            to,
            subject: 'Your OTP Code',
            // text: `Your OTP code is: ${otp}`,
            html: `<b>Your OTP code is: ${otp}</b>`,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
