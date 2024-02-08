import nodemailer from 'nodemailer';
import logger from './logger';

// Configura el transporte SMTP
const transporter = nodemailer.createTransport({
    service: 'smtp.example.com',
    port: 587,
    secure: false, // true para TLS, false para STARTTLS
    auth: {
        user: 'tu_usuario@example.com',
        pass: 'tu_contraseña'
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
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.error(error);
        } else {
            logger.info(info.response);
        }
    });
}

//Export a function to send email
export default sendEmail