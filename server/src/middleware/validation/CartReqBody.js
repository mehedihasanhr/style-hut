


export const valCartReqBody = (req, res, next) => {
   const data = req.body;

   if(data.carts.length === 0){
       return res.status(400).json({
           status: 'error',
           message: 'Invalid request body',
       });
   }
    next();
}