"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// * connect to mongo db
const connect = () => {
  _mongoose.default.set('strictQuery', true);
  return _mongoose.default.connect(_config.default.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if (err) {
      console.log('Error connecting to database');
      console.log(err);
    } else {
      console.log('Connected to database');
    }
  });
};
exports.connect = connect;