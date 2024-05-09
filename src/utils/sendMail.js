import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PSW,
    },
});


export default async function sendMail(email, name) {
    const html = `
    <h3>Subject: Contact Confirmation.</h3>
    <h2>Thank you for contacting Clothes Design.</h2>
    <p>Dear ${name},</p>
    <p>We appreciate you reaching out to us. We received your email regarding the clothes design.</p>
    <p>We value your feedback and will take it into consideration.</p>
    <p>Sincerely,</p>
    <p>The Clothes Design Team</p>`;
    try {
        const info = await transporter.sendMail({
            from: `"Clothes Design" <${process.env.EMAIL_USER}>`, // sender address
            to: email, // list of receivers
            subject: "Contact Confirmation",
            html: html,
        });

        return info;
    } catch (err) {
        return err;
    }
};
