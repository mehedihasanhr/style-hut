const mongoose = require('mongoose');
const config = require('./index');


// connect to database 

const dbConnect = () => {
    return mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}


module.exports = dbConnect;

