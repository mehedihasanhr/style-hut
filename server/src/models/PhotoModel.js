import mongoose from 'mongoose'

const PhotoSchema = new mongoose.Schema(
  {
    originalname: { type: String, required: true },
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
)

const PhotoModel = mongoose.model('Photo', PhotoSchema)

export default PhotoModel
