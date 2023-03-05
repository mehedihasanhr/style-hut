"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// * User Schema
const userSchema = new _mongoose.default.Schema({
  id: {
    type: _mongoose.default.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  data_of_birth: {
    type: Date
  },
  avatar: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  gander: {
    type: String,
    default: ''
  },
  address: {
    type: {
      country: {
        type: String,
        default: ''
      },
      city: {
        type: String,
        default: ''
      },
      street: {
        type: String,
        default: ''
      },
      house: {
        type: String,
        default: ''
      },
      apartment: {
        type: String,
        default: ''
      },
      zip: {
        type: String,
        default: ''
      },
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
    type: [_mongoose.default.Schema.Types.ObjectId],
    ref: 'Review',
    default: []
  },
  notifications: {
    type: [_mongoose.default.Schema.Types.ObjectId],
    ref: 'Notification',
    default: []
  },
  orders: {
    type: [_mongoose.default.Schema.Types.ObjectId],
    ref: 'Order',
    default: []
  },
  carts: {
    type: [_mongoose.default.Schema.Types.ObjectId],
    ref: 'Cart',
    default: []
  }
}, {
  timestamps: true
});

// * preset password hashing middleware
userSchema.pre('save', async function (next) {
  const user = this;
  const salt = await _bcryptjs.default.genSalt(8);
  try {
    if (!user.isModified('password')) return next();
    user.password = await _bcryptjs.default.hash(user.password, salt);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// * custom method to validate password
userSchema.methods.validatePassword = async function (password) {
  return new Promise((resolve, reject) => {
    _bcryptjs.default.compare(password, this.password, (error, isMatch) => {
      if (error) return reject(error);
      resolve(isMatch);
    });
  });
};

// * create User model
const User = _mongoose.default.model('User', userSchema);
var _default = User;
exports.default = _default;