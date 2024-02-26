import nodemailer from 'nodemailer';
import logger from './logger.js';

const {
  SMTP_EMAILFROM,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASSWORD
} = process.env;

// Configura el transporte SMTP
let transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE === 'true', // Convertir a booleano
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  },
  tls: {
    ciphers:'SSLv3'
  }
});

// Función para enviar correo electrónico
function sendEmail(sendTo, mailSubject, mailMessage) {
  // Define el correo electrónico a enviar
  const mailOptions = {
    from: "Arneby <" + SMTP_EMAILFROM + ">",
    to: "<" + sendTo + ">",
    subject: mailSubject,
    html: mailMessage
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      logger.error('Email: ' + error);
    }
  });
}


// Exporta la función para enviar correo electrónico
export default sendEmail;