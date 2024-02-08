import { createLogger, transports, format } from 'winston';
import { join } from 'path';

// Obtener la ruta de la carpeta raíz del proyecto
const rootDir = process.cwd(); // Esto devuelve la ruta del directorio actual donde se está ejecutando el proceso Node.js

// Definir la ruta completa de la carpeta de logs
const logDir = join(rootDir, 'logs');

// Define un nuevo formato de fecha y hora
const customFormat = format.printf(({ level, message }) => {
  const now = new Date().toLocaleString(); // Obtiene la fecha y hora actual
  return `${now} [${level}]: ${message}`; // Agrega la fecha y hora al mensaje de log
});

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        customFormat // Utiliza el formato personalizado de fecha y hora
      )
    }),
    new transports.File({
      filename: join(logDir, 'error.log'),
      level: 'error',
      format: format.combine(
        customFormat // Utiliza el formato personalizado de fecha y hora
      )
    }),
    new transports.File({
      filename: join(logDir, 'combined.log'),
      format: format.combine(
        customFormat // Utiliza el formato personalizado de fecha y hora
      )
    })
  ]
});

export default logger;
