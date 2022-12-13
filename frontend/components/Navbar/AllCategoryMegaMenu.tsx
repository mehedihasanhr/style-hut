import Link from 'next/link'
import React from 'react'
import { allCategory } from '../../constants/categorys'

export const AllCategoryMegaMenu = () => {
  return (
    <div className="w-full bg-white h-full rounded-b-md drop-shadow-lg shadow-slate-200 p-5">
      {/* <div className="grid grid-cols-12 gap-8"> */}
      {/* <div className="col-span-3"> */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5">
        <div>
          {allCategory.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="text-sm font-semibold text-slate-700">
                {item.header}
              </div>
              <ul className="">
                {item.links.map((link, index) => (
                  <li key={index} className="">
                    <Link
                      href={link.link}
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
      {/* </div> */}
      {/* </div> */}
    </div>
  )
}
