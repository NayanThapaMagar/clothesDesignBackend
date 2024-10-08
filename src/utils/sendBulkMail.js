import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import Mail from '../modules/mail.js';
import logger from '../../logger/index.js';

config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PSW,
    },
});

export default async function sendBulkMail(email) {
    const mail = await Mail.findOne({});
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Email Subject</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                color: #666666;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #999999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>${mail.title}</h1>
            <p>Hello,</p>
            <p>${mail.body}.</p>
            <p>${mail.remarks}.</p>
            
            <p>Best regards,</p>
            
            <p>The ${mail.compalyName}.</p>

            <img src="${mail.image}" alt="logo" width="30" height="20" />

        </div>
    
        <div class="footer">
            <p>The ${mail.compalyName} Team.</p>
        </div>
    </body>
    </html>`;

    try {
        const info = await transporter.sendMail({
            from: `"Clothes Design" <${process.env.EMAIL_USER}>`, // sender address
            to: email, // list of receivers
            subject: "Clothes Design Mail",
            html: html,
        });

        return info;
    } catch (error) {
        logger.log('error', error);
        return error;
    }
};
