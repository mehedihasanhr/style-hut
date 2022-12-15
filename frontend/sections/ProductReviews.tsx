import React from 'react'
import Rating from '../components/Rating'
import Review from '../components/Review'

const ProductReviews = () => {
  return (
    <section className="">
      <div className="container py-8 border-t border-dashed">
        <div>
          <h5>Ratings & Reviews</h5>
          <div className="py-8 flex items-center gap-10 border-b border-dashed">
            <div className="">
              <div>
                <h1 className="md:text-5xl font-medium">
                  4.2{' '}
                  <sub className="text-sm md:text-2xl text-gray-600">/5</sub>
                </h1>
                <Rating className="mt-2" rating={4.2} />
                <div className="flex items-center text-sm mt-2">77 Ratings</div>
              </div>
            </div>

            <div className="md:ml-10">
              <div className="md:w-72">
                <div className="flex items-center gap-2">
                  <span className="w-20 text-sm md:text-base text-right whitespace-nowrap">
                    5 stars
                  </span>
                  <div className="w-20 md:w-64 h-2 rounded-full bg-gray-200">
                    <div className="w-3/4 h-full bg-yellow-500 drop-shadow-[0_0px_2px_rgba(250,204,21,0.55)] rounded-full"></div>
                  </div>
                  <span className="w-12 text-sm md:text-base">80%</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-20 text-sm md:text-base text-right whitespace-nowrap">
                    4 stars
                  </span>
                  <div className="w-20 md:w-64 h-2 rounded-full bg-gray-200">
                    <div className="w-2/4 h-full bg-yellow-500 drop-shadow-[0_0px_2px_rgba(250,204,21,0.55)] rounded-full"></div>
                  </div>
                  <span className="w-12 text-sm md:text-base">10%</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-20 text-sm md:text-base text-right whitespace-nowrap">
                    3 stars
                  </span>
                  <div className="w-20 md:w-64 h-2 rounded-full bg-gray-200">
                    <div className="w-1/4 h-full bg-yellow-500 drop-shadow-[0_0px_2px_rgba(250,204,21,0.55)] rounded-full"></div>
                  </div>
                  <span className="w-12 text-sm md:text-base">5%</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-20 text-sm md:text-base text-right whitespace-nowrap">
                    2 stars
                  </span>
                  <div className="w-20 md:w-64 h-2 rounded-full bg-gray-200">
                    <div className="w-1/4 h-full bg-yellow-500 drop-shadow-[0_0px_2px_rgba(250,204,21,0.55)] rounded-full"></div>
                  </div>
                  <span className="w-12 text-sm md:text-base">3%</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-20 text-sm md:text-base text-right whitespace-nowrap">
                    1 stars
                  </span>
                  <div className="w-20 md:w-64 h-2 rounded-full bg-gray-200">
                    <div className="w-1/4 h-full bg-yellow-500 drop-shadow-[0_0px_2px_rgba(250,204,21,0.55)] rounded-full"></div>
                  </div>
                  <span className="w-12 text-sm md:text-base">2%</span>
                </div>
              </div>
            </div>
          </div>
          {/* reviews */}

          <div className="flex flex-col gap-3 mt-5">
            {[1, 2, 3, 4].map((item) => (
              <Review key={item} />
            ))}

            <div className="flex justify-center items-center py-5">
              <button className="text-sm md:text-base text-gray-600">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReviews
