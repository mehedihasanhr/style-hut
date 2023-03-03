import { Link } from 'react-router-dom'
import React from 'react'
import allCategory from '../constants/categories.json'
import { formatUrlString } from '../utils/formatUrlString'

const MegaMenu = () => {
  return (
    <div className="w-full bg-white h-full rounded-b-md drop-shadow-lg shadow-slate-200 p-5">
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5">
        <div>
          {allCategory.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="text-sm font-semibold text-slate-700">{item.header}</div>
              <ul className="">
                {item.links.map((link, index) => (
                  <li key={index} className="">
                    <Link
                      to={`/products?c=${formatUrlString(item.header)}&sc=${formatUrlString(link.label)}`}
                      className="text-sm py-1 text-slate-500 hover:text-blue-500"
                    >
                      {link.label}
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
