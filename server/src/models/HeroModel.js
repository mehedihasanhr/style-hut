import mongoose from 'mongoose'

// hero slider schema
const heroSchema = new mongoose.Schema({
  slider: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo' },
  active: { type: Boolean, default: true },
})

const HeroSlider = mongoose.model('Hero', heroSchema)

export default HeroSlider
