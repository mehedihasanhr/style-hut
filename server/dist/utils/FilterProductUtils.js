"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterProductData = void 0;
/*
* This file contains the functions that 
* are used to filter the products
*/

const filterProductData = query => {
  let filter = {};
  if (query.category) {
    filter["categories.main"] = query.category;
  }
  if (query.subcategory) {
    filter["categories.sub"] = {
      $in: [query.subcategory]
    };
  }
  console.log(filter);
  return filter;
};
exports.filterProductData = filterProductData;