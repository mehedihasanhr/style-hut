const config = require("../config");



module.exports = {
    credential: (req, res, next) => {
        const listedOrigins = config.ORIGINS.split(",");
        const origin = req.headers.origin;
        if(listedOrigins.indexOf(origin) !== -1){
            res.setHeader("Access-Control-Allow-Origin", '*');
            res.header("Access-Control-Allow-Credentials", true);
        }
        next();
    }
}