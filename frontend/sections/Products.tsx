import Link from 'next/link'
import React from 'react'
import dynamic from 'next/dynamic'

const Card = dynamic(() => import('../components/Card'))

type TProductsProps = {
  heading: string
}

const Products = ({ heading }: TProductsProps) => {
  return (
    <section className="sm:mb-[100px]">
      <div className="container">
        <div className="flex items-center justify-between">
          <h4 className="text-base md:text-xl font-medium text-gray-500">
            {heading}
          </h4>
          <Link
            href="/"
            className="text-slate-500 text-xs md:text-sm hover:text-blue-500"
          >
            See More
          </Link>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-12 gap-3 sm:gap-5">
            {[...Array(5)].map((item, index) => (
              <div
                key={index}
                className="col-span-6 sm:col-span-4 lg:col-span-3 xl:col-span-2"
              >
                <Card
                  title={`sweater-${index + 1} for men's fations`}
                  alt=""
                  href="/"
                  image={`/cloths/sweater-${index + 1}.png`}
                />
              </div>
            ))}

            {[...Array(5)].map((item, index) => (
              <div
                key={index}
                className="col-span-6 sm:col-span-4 lg:col-span-3 xl:col-span-2"
              >
                <Card
                  title={`sweater-${index + 1} for men's fations`}
                  alt=""
                  href="/"
                  image={`/cloths/sweater-${index + 1}.png`}
                />
              </div>
            ))}

            {[...Array(2)].map((item, index) => (
              <div
                key={index}
                className="col-span-6 sm:col-span-4 lg:col-span-3 xl:col-span-2"
              >
                <Card
                  title={`sweater-${index + 1} for men's fations`}
                  alt=""
                  href="/"
                  image={`/cloths/sweater-${index + 1}.png`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
