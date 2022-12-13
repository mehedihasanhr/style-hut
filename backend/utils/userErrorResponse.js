const userErrorResponse = (err) =>{
    let errors = {first_name: '', last_name: '', email: '', password: ''};

    // duplicate error code
    if(err.code === 11000){
        errors.email = 'That email is already registered';
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    if(err.message.includes('incorrect email')){
        errors.message = 'incorrect email';
    }


    if(err.message.includes('incorrect password')){
        errors.message = 'That password is incorrect';
    }

    if(err.message.includes('jwt malformed')){
        errors.message = 'Invalid token';
    }

    if(err.message.includes('jwt expired')){
        errors.message = 'Token expired';
    }

    if(err.message.includes('jwt must be provided')){
        errors.message = 'Token must be provided';
    }

    if(err.name === 'CastError'){
        errors.message = 'User not found';
    }


    return errors;
}


module.exports = {userErrorResponse};