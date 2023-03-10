import _ from 'lodash'
import ProductModel from '../models/ProductModel'
import { filterProductData } from '../utils/FilterProductUtils'

class ProductController {
  // * post method to create a new product
  create = async (req, res) => {
    try {
      // * create new product
      let product = await ProductModel.create(req.body)

      // * filter product data and remove __v field
      product = product.toObject()
      delete product.__v
      delete product.createdAt
      delete product.updatedAt

      // * return product
      return res.status(201).json({
        status: 'success',
        message: 'Product created successfully',
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  }

  //* get method to get all products
  getAllProducts = async (req, res) => {
    const limit = parseInt(req.query.limit) || 2
    const page = parseInt(req.query.page) || 1

    const skip = (page - 1) * limit
    const filter = filterProductData(req.query)
    try {
      // * get all products with pagination and sorting
      let products = await ProductModel.find(filter).skip(skip).limit(limit)

      // * filter product data and remove __v field
      products = products.map((product) => {
        product = product.toObject()
        delete product.__v
        return product
      })

      // * return products
      return res.status(200).json({
        status: 'success',
        message: 'Products fetched successfully',
        data: products,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  }

  //* get method to get a single product
  getSingleProduct = async (req, res) => {
    try {
      // * get product
      let product = await ProductModel.findById(req.params.id)
        .populate({
          path: 'reviews',
          populate: {
            path: 'user',
            select: 'name',
          },
          populate: {
            path: 'replies',
            select: 'user comment',
            populate: {
              path: 'user',
              select: 'name',
            },
          },
        })
        .exec()

      // * check if product exists
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found',
        })
      }

      // * filter product data and remove __v field
      product = product.toObject()
      delete product.__v
      delete product.createdAt
      delete product.updatedAt

      // * return product
      return res.status(200).json({
        status: 'success',
        message: 'Product fetched successfully',
        data: product,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  }

  // * put method to update a product
  update = async (req, res) => {
    // * validate request body for required fields
    if (_.isEmpty(req.body)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid request body',
      })
    }

    try {
      // * check if product exists
      const existedProduct = await ProductModel.findById(req.params.id)
      if (!existedProduct) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found',
        })
      }

      // * update product
      let updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

      // * filter product data and remove some field
      updatedProduct = updatedProduct.toObject()
      delete updatedProduct.__v
      delete updatedProduct.createdAt
      delete updatedProduct.updatedAt

      if (!updatedProduct) {
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        })
      }

      // * return product
      return res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: updatedProduct,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  }

  // * delete method to delete a product
  delete = async (req, res) => {
    // * check if product exists
    const existedProduct = await ProductModel.findById(req.params.id)
    if (!existedProduct) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      })
    }

    try {
      // * delete product
      await ProductModel.findByIdAndDelete(req.params.id)

      // * return product
      return res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully',
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  }
}

export default new ProductController()
