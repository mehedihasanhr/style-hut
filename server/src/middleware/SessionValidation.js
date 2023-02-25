
// session validation middleware will check if session is active or not
// * check if session is active
export const sessionValidation =  async (req, res, next) => {
    
    // check existed session and incoming session is same or not
    const session = req.session.user;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const agent = req.headers['user-agent'];

    if ( session && session.logs.ip === ip && session.logs.agent === agent) {
        next();
    } else {
       return res.status(401).json({
            message: "Session Expired"
        });
    }
}