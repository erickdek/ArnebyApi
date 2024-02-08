import nodemailer from 'nodemailer';
import logger from './logger';
const {SMTP_SERVICE, SMTP_PORT, SMTP_TLS, SMTP_USER, SMTP_PASSWORD} = process.env;

// Configura el transporte SMTP
const transporter = nodemailer.createTransport({
    service: SMTP_SERVICE,
    port: SMTP_PORT,
    secure: SMTP_TLS, // true para TLS, false para STARTTLS
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
    }
});

function sendEmail(sendFrom, sendTo, mailSubject, mailMessage){
    // Define el correo electrónico a enviar
    const mailOptions = {
        from: sendFrom,
        to: sendTo,
        subject: mailSubject,
        text: mailMessage
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            logger.error(error);
        }
    });
}

//Export a function to send email
export default sendEmail