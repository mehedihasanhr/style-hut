import HeroSlider from '../models/HeroModel'

class HeroSliderController {
  // get hero slider
  async index(req, res) {
    const heroSlider = await HeroSlider.find().select('-__v').populate('slider')
    res.status(200).json({
      data: heroSlider,
      message: 'Hero slider fetched successfully',
      status: 'success',
    })
  }

  // add hero slider
  async store(req, res) {
    console.log(req.body)
    const { slider, active } = req.body
    if (!slider) {
      return res.status(400).json('Slider and status are required')
    }

    try {
      const heroSlider = await HeroSlider.create({ slider, active })

      if (!heroSlider) {
        return res.status(400).json('Hero slider not created')
      }

      return res.status(201).json({
        data: heroSlider,
        message: 'Hero slider created successfully',
        status: 'success',
      })
    } catch (err) {
      console.log(err.message)
      return res.status(500).json(err.message)
    }
  }

  // delete hero slider
  async delete(req, res) {
    const { id } = req.params
    const heroSlider = await HeroSlider.findByIdAndDelete(id).select('-__v').exec()

    if (!heroSlider) {
      return res.status(400).json('Hero slider not found')
    }

    return res.status(200).json({
      message: 'Hero slider deleted successfully',
      status: 'success',
    })
  }
}

export default new HeroSliderController()
