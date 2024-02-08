import mongoose from 'mongoose';
import logger from './src/services/logger.js';

const {APP_MONGODB_HOST, APP_MONGODB_DATABASE, APP_MONGODB_SERVER} = process.env;
const MONGODB_URI = `${APP_MONGODB_SERVER}://${APP_MONGODB_HOST}/${APP_MONGODB_DATABASE}`;

const dbConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        logger.info('>>> Connected DB');
    } catch (err){
        logger.error('Error: ' + err);
    }
}

export default dbConnect;
