import nodemailer from 'nodemailer';
import * as VerMail from '../view/email/emailVerification';
import * as resetMail from '../view/email/forgotPassword';

interface MailOptionType {
    to: string;
    subject: string;
    text: string;
    html: string;
    from: string | undefined;
}

interface UserData {
    email: string;
    name: string;
}

const {
    MAIL_PASSWORD,
    MAIL_USERNAME,
    MAIL_FROM_ADDRESS,
    MAIL_HOST,
    NODE_ENV,
} = process.env;

class Email {
    to: string;
    name: string;
    url: string;
    from: string | undefined;
    constructor(user: UserData, url: string) {
        this.to = user.email;
        this.name = user.name;
        this.url = url;
        this.from = MAIL_FROM_ADDRESS;
    }

    newTransport(): any {
        if (NODE_ENV === 'production') {
            // Sendgrid
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: MAIL_USERNAME,
                    pass: MAIL_PASSWORD,
                },
            });
        }

        return nodemailer.createTransport({
            host: MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: MAIL_USERNAME,
                pass: MAIL_PASSWORD,
            },
        });
    }
    // Send the actual email
    async send(template: string, text: string, subject: string): Promise<void> {
        // 1) Render HTML based on a pug template
        const html = template;

        // 2) Define email options
        const mailOptions: MailOptionType = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text,
        };
        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }
    async emailVerification(): Promise<void> {
        const html = VerMail.template(this.name, this.url);
        const text = VerMail.text(this.name, this.url);
        await this.send(html, text, 'Jiffix Account Verification');
    }
    async forgotPassword(): Promise<void> {
        const html = resetMail.template(this.url);
        const text = resetMail.text(this.url);
        await this.send(html, text, 'Reset password');
    }
}

export default Email;
