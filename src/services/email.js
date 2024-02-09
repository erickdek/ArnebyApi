import nodemailer from 'nodemailer';
import logger from './logger.js';

const {
  SMTP_EMAILFROM,
  SMTP_SERVICE,
  SMTP_PORT,
  SMTP_TLS,
  SMTP_USER,
  SMTP_PASSWORD
} = process.env;

// Configura el transporte SMTP
const transporter = nodemailer.createTransport({
  service: SMTP_SERVICE,
  port: SMTP_PORT,
  secure: SMTP_TLS === 'true', // Convertir a booleano
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
});

// Función para enviar correo electrónico
function sendEmail(sendTo, mailSubject, mailMessage) {
  // Define el correo electrónico a enviar
  const mailOptions = {
    from: SMTP_EMAILFROM,
    to: sendTo,
    subject: mailSubject,
    text: mailMessage
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      logger.error('Error: ' + error);
    } else {
      logger.info(`Correo electrónico enviado a ${sendTo}`);
    }
  });
}

// Exporta la función para enviar correo electrónico
export default sendEmail;