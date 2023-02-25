"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFileAlreadyExist = void 0;
var _promises = _interopRequireDefault(require("fs/promises"));
var _path = _interopRequireDefault(require("path"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const _dirname = _path.default.resolve();
const uploadDir = _path.default.join(_dirname, 'public/uploads');
const isFileAlreadyExist = async (req, res, next) => {
  const uploadedFile = req.file;
  const buffer = await _promises.default.readFile(uploadedFile.path);
  const hash = _crypto.default.createHash('sha256').update(buffer).digest('hex');
  try {
    const files = await _promises.default.readdir(uploadDir);
    if (files.length > 0) {
      for (const file of files) {
        const fileBuffer = await _promises.default.readFile(_path.default.join(uploadDir, file));
        const fileHash = _crypto.default.createHash('sha256').update(fileBuffer).digest('hex');
        if (hash === fileHash) {
          await _promises.default.unlink(uploadedFile.path);
          return res.status(400).json({
            msg: 'File already exists'
          });
        }
      }
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Something went wrong'
    });
  }
};
exports.isFileAlreadyExist = isFileAlreadyExist;