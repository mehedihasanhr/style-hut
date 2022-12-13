const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String, required: true, trim: true},
    last_name: {type: String, required: true, trim: true},
    avatar: {type: String, default: ""},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true },
    phone: {type: String, default: ""},
    address: {type: {
        street: {type: String, default: ""},
        city: {type: String, default: ""},
        state: {type: String, default: ""},
        zip: {type: String, default: ""},
        _id: false
    }, default: {}},
    role: {
        type: String,
        enum: ['seller', 'user', 'admin'],
        default: 'user'
    },
}, {
    timestamps: true
});


// Hash password before saving to database
userSchema.pre('save', async function(next) {
    try {
        if(!this.isModified("password")) {
            return next();
        }
        // Generate a salt
        const salt = await bycrypt.genSalt(10);
        // Generate a password hash (salt + hash)
        const passwordHash = await bycrypt.hash(this.password, salt);
        // Re-assign hashed version over original, plain text password
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
})

// compare password

userSchema.methods.isValidPassword = function(newPassword) {
    return new Promise((resolve, reject) => {
        bycrypt.compare(newPassword, this.password, (err, same) => {
            if(err) {
                reject(err);
            } else {
                resolve(same);
            }
        })
    })
}



module.exports = {
    User: mongoose.model('user', userSchema)
}