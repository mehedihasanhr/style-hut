

 

 const userDataValidator = (req, res, next) => {
    const {
        name,
        photo,
        email,
        password,
        role,
        phone,
        address
    } = req.body;


    if(!name || !email || !password) {
        return res.status(400).send({
            message: 'Bad request',
            error: true
        });
    }

 }