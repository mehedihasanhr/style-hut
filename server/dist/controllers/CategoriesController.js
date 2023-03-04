"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CategoryModel = _interopRequireDefault(require("../models/CategoryModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CategoriesController {
  async index(req, res) {
    const categories = await _CategoryModel.default.find().select('-__v').exec();
    res.status(200).json({
      status: 'success',
      message: 'Categories fetched successfully',
      data: categories
    });
  }

  // add category to database
  async store(req, res) {
    const {
      name,
      sub
    } = req.body;
    if (!name || !sub) {
      return res.status(400).json('Invalid request body');
    }
    try {
      // check if category exist in database
      let isExist = await _CategoryModel.default.findOne({
        name
      }).exec();

      // if category exist, add sub category to it
      if (isExist) {
        isExist.sub = [...isExist.sub, sub];
        await isExist.save((err, category) => {
          if (err) {
            return res.status(500).json(err.message);
          }
          return res.status(200).json({
            status: 'success',
            message: 'Category updated successfully',
            data: category
          });
        });
      } else {
        // if category does not exist, create new category
        await _CategoryModel.default.create({
          name,
          sub
        }, (err, category) => {
          if (err) return res.status(500).json(err.message);
          return res.status(201).json({
            status: 'success',
            message: 'Category created successfully',
            data: category
          });
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err.message);
    }
  }
}
var _default = new CategoriesController();
exports.default = _default;