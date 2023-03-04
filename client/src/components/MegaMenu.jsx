import { Link } from 'react-router-dom'
import React from 'react'
import { formatUrlString } from '../utils/formatUrlString'
import { useGetCategoriesQuery } from '../features/categories/categoriesApiSlice'
import { useSelector } from 'react-redux'

const MegaMenu = () => {
  const { categories } = useSelector((state) => state.categories)
  const { error, isLoading } = useGetCategoriesQuery({
    refetchOnMountOrArgChange: true,
    skip: categories.length > 0,
  })

  if (isLoading) return null
  if (error) return <div>Error: {error}</div>

  return (
    <div className="w-full bg-white h-full rounded-b-md drop-shadow-lg shadow-slate-200 p-5">
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5">
        <div>
          {categories.map(({ _id, name, sub }) => (
            <div key={_id} className="mb-4">
              {/* hide text */}
              <div className="text-sm font-semibold text-slate-700">{name}</div>
              <ul className="">
                {sub.map((link, index) => (
                  <li key={index} className="">
                    <Link
                      to={`/products?c=${formatUrlString(name)}&sc=${formatUrlString(link)}`}
                      className="text-sm py-1 text-gray-600 hover:text-blue-700 hover:font-medium"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MegaMenu
