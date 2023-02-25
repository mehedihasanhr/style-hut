"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _crypto = _interopRequireDefault(require("crypto"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const _dirname = _path.default.resolve();

// * storage engine
const storage = _multer.default.diskStorage({
  destination: (req, file, cb) => {
    // * allow extension of file 
    const filetypes = /jpeg|jpg|png|gif/;

    // * check extension
    const extname = filetypes.test(_path.default.extname(file.originalname).toLowerCase());

    // * check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      // * check if public folder exists
      if (!_fs.default.existsSync(_path.default.join(_dirname, 'public'))) {
        _fs.default.mkdirSync(_path.default.join(_dirname, 'public'));
      }

      // * check if uploads folder exists
      if (!_fs.default.existsSync(_path.default.join(_dirname, 'public/uploads'))) {
        _fs.default.mkdirSync(_path.default.join(_dirname, 'public/uploads'));
      }

      // * save file
      cb(null, _path.default.join(_dirname, 'public/uploads'));
    } else {
      return cb(new Error('Only images are allowed'));
    }
  },
  // * rename file
  filename: (req, file, cb) => {
    _crypto.default.randomBytes(16, (err, buf) => {
      if (err) return cb(err);
      const ext = _path.default.extname(file.originalname);
      const hash = buf.toString('hex');
      const filename = `${hash}${ext}`;
      cb(null, filename);
    });
  }
});

// * init upload
const upload = (0, _multer.default)({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // 5MB
  }
});
var _default = upload;
exports.default = _default;