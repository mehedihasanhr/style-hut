import mongoose from 'mongoose';
import config from '../config';


// * connect to mongo db
export const connect = () => {
    mongoose.set('strictQuery', true);

    return mongoose.connect(config.db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err) {
            console.log('Error connecting to database');
            console.log(err);
        } else {
            console.log('Connected to database');
        }
    });
}