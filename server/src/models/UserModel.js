import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// * User Schema
const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    data_of_birth: {
        type: Date,
    },
    avatar: {type: String, default: ''},
    phone: {type: String, default: ''},
    gander: { type: String, default: '' },
    address: {
        type: {
            country: { type: String, default: '' },
            city: { type: String, default: '' },
            street: { type: String, default: '' },
            house: { type: String, default: '' },
            apartment: { type: String, default: '' },
            zip: { type: String, default: '' },
            _id: false
        },
        
        default: {}
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Review',
        default: []
    }, 
    notifications: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Notification',
        default: []
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Order',
        default: []
    },
    carts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Cart',
        default: []
    },
}, {
    timestamps: true
})

// * preset password hashing middleware
userSchema.pre('save', async function(next) {
    const user = this;
    const salt = await bcrypt.genSalt(8);
    try{
        if(!user.isModified('password')) return next();
        user.password = await bcrypt.hash(user.password, salt);
    }catch(error){
        console.log(error);
        next(error);
    }
})


// * custom method to validate password
userSchema.methods.validatePassword = async function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (error, isMatch) => {
            if(error) return reject(error);
            resolve(isMatch);
        })
    })
}



// * create User model
const User = mongoose.model('User', userSchema);

export default User;