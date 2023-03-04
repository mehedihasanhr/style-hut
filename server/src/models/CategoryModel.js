import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sub: { type: [String], required: true },
})

const Category = mongoose.model('Category', categorySchema)

export default Category
