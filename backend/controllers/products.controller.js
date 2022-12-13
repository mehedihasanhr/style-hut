const {Product} = require('../models/product.model');
const CURDController = require('../utils/CURD');


module.exports = new CURDController(Product);
