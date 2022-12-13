const config = require("../config");

module.exports = {
    corOptions: {
        origin: (origin, callback) => {
            const whitelist = config.ORIGINS.split(',');
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }           
        },
        optionsSuccessStatus: 200,        
    }
}