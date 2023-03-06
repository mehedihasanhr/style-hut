import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Checkbox from './Checkbox'

const Categories = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const navigate = useNavigate()
  // get query params from url
  const urlParams = new URLSearchParams(window.location.search)

  useEffect(() => {
    const query = urlParams.get('sub')
    if (query) {
      setSelectedCategories(query.split(','))
    }

    console.log(query)
  }, [])

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectedCategories([...selectedCategories, value])
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== value))
    }
  }

  useEffect(() => {
    let q = encodeURIComponent(selectedCategories.join(','))
    let base = '/categories'
    if (q) {
      base = `${base}?c="man"&sub=${q}`
      navigate(base, { replace: true })
    }
  }, [selectedCategories])

  return (
    <div className="flex flex-col gap-y-3">
      <h6 className="text-sm text-gray-500"> Categories </h6>
      <div className="px-3">
        <Checkbox
          label="Accessories & supplies"
          labelClassName="text-sm text-black/80"
          value="Accessories & supplies"
          onChange={handleCategoryChange}
        />

        <Checkbox
          label="Cables & adapters"
          labelClassName="text-sm text-black/80"
          value="Cables & adapters"
          onChange={handleCategoryChange}
        />
      </div>
    </div>
  )
}

const FilterBar = () => {
  return (
    <div className="flex flex-col">
      <Categories />
    </div>
  )
}

export default FilterBar
