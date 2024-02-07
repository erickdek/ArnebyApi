import mongoose from 'mongoose';

const {APP_MONGODB_HOST, APP_MONGODB_DATABASE, APP_MONGODB_SERVER} = process.env;
const MONGODB_URI = `${APP_MONGODB_SERVER}://${APP_MONGODB_HOST}/${APP_MONGODB_DATABASE}`;


const dbConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {useUnifiedTopology: true,useNewUrlParser: true})
        console.log('>>> Connected DB');
    } catch (err){
        console.log(err);
    }
}

export default dbConnect;