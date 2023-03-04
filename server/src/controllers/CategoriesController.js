import CategoryModel from '../models/CategoryModel'

class CategoriesController {
  async index(req, res) {
    const categories = await CategoryModel.find().select('-__v').exec()
    res.status(200).json({
      status: 'success',
      message: 'Categories fetched successfully',
      data: categories,
    })
  }

  // add category to database
  async store(req, res) {
    const { name, sub } = req.body
    if (!name || !sub) {
      return res.status(400).json('Invalid request body')
    }

    try {
      // check if category exist in database
      let isExist = await CategoryModel.findOne({ name }).exec()

      // if category exist, add sub category to it
      if (isExist) {
        isExist.sub = [...isExist.sub, sub]
        await isExist.save((err, category) => {
          if (err) {
            return res.status(500).json(err.message)
          }
          return res.status(200).json({
            status: 'success',
            message: 'Category updated successfully',
            data: category,
          })
        })
      } else {
        // if category does not exist, create new category
        await CategoryModel.create({ name, sub }, (err, category) => {
          if (err) return res.status(500).json(err.message)
          return res.status(201).json({
            status: 'success',
            message: 'Category created successfully',
            data: category,
          })
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json(err.message)
    }
  }
}

export default new CategoriesController()
