import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import Mail from '../modules/mail.js';
import logger from '../../logger/index.js';

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
    const mail = await Mail.findOne({});
    const html = `
    <h3>Subject: ${mail.subject}.</h3>
    <img src="${mail.image}" alt="logo" />
    <h2>${mail.title}.</h2>
    <p>Dear ${name},</p>
    <p>${mail.body}.</p>
    <p>${mail.remarks}.</p>
    <p>Sincerely,</p>
    <p>The ${mail.compalyName} Team</p>`;
    try {
        const info = await transporter.sendMail({
            from: `"Clothes Design" <${process.env.EMAIL_USER}>`, // sender address
            to: email, // list of receivers
            subject: "Contact Confirmation",
            html: html,
        });

        return info;
    } catch (error) {
        logger.log('error', error);
        return error;
    }
};
