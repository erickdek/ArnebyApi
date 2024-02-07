import mongoose from 'mongoose';
import logger from './logger.js';

const {APP_MONGODB_HOST, APP_MONGODB_DATABASE, APP_MONGODB_SERVER} = process.env;
const MONGODB_URI = `${APP_MONGODB_SERVER}://${APP_MONGODB_HOST}/${APP_MONGODB_DATABASE}`;

const dbConnect = async () => {
    try {
        logger.info('MONGODB_URI:' + MONGODB_URI);
        await mongoose.connect(MONGODB_URI, {useUnifiedTopology: true,useNewUrlParser: true})
        logger.info('>>> Connected DB');
    } catch (err){
        logger.error('Error: ' + err);
    }
}

export default dbConnect;