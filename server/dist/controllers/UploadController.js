"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PhotoModel = _interopRequireDefault(require("../models/PhotoModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class UploadController {
  constructor() {
    // Upload file to server
    _defineProperty(this, "upload", async (req, res) => {
      console.log(req.file);
      try {
        // * check if file is uploaded
        if (!req.file) {
          return res.status(400).json({
            status: 'error',
            message: 'No file uploaded'
          });
        }

        // * create new photo
        try {
          const photo = new _PhotoModel.default({
            originalname: req.file.originalname,
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            user: req.session.user.data.id
          });

          // * save photo
          try {
            const savedPhoto = await photo.save();
            return res.status(201).json({
              status: 'success',
              message: 'Photo uploaded successfully',
              data: savedPhoto
            });
          } catch (err) {
            console.log(err);
            return res.status(500).json({
              status: 'error',
              message: 'Internal server error'
            });
          }
        } catch (err) {
          console.log(err);
          return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      }
    });
  }
}
var _default = new UploadController();
exports.default = _default;