import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import Quantity from '../components/Quantity'
import Rating from '../components/Rating'

const ProductDetails = () => {
  const [image, setImage] = React.useState('/cloths/sweater-3.png')
  const [quantity, setQuantity] = React.useState(1)
  const [selColor, setSelColor] = React.useState(0)
  return (
    <section className="py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="container">
        <div className="grid grid-cols-12 gap-6 xl:gap-10">
          {/* images */}
          <div className="col-span-12 sm:col-span-5 lg:col-span-4">
            <div className="flex flex-col gap-3">
              {/* product images */}
              <div className="w-full bg-gray-50 flex items-center justify-center">
                <div className="relative w-64 h-64 sm:w-[250px] sm:h-[250px]  md:w-[350px] md:h-[350px] xl:w-[450px] xl:h-[500px]">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="
                    (max-width: 992px) 450px,
                  "
                    loading="lazy"
                  />
                </div>
              </div>

              {/* product thumbnails */}
              <div className="flex flex-row gap-3 sm:gap-2 md:gap-3 mx-auto">
                {[1, 2, 3, 4].map((item, index) => (
                  <div
                    key={index}
                    className="p-1.5 rounded-sm bg-gray-100 hover:bg-slate-500/20"
                  >
                    <button
                      type="button"
                      onClick={() => setImage(`/cloths/sweater-${item}.png`)}
                    >
                      <div className="relative w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-16">
                        <Image
                          src={`/cloths/sweater-${item}.png`}
                          alt=""
                          fill
                          sizes="
                        (max-width: 650px) 30px,
                        64px
                        "
                        />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Product Highlight */}
          <div className="col-span-12 sm:col-span-7 lg:col-span-5 border-b lg:border-0 lg:border-r border-dashed border-gray-100">
            {/* product info */}
            <p className="text-xs font-medium text-gray-700 leading-[20px]">
              {"Men's Fetions"}
            </p>

            {/* product title */}
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 line-clamp-2 mb-2 ">
              {"Shirt 1 men's fetions Shirt 1 men's fetions "}
            </h2>

            <div className="flex items-center space-x-2 text-xs font-medium text-gray-600">
              <Rating rating={4.9} iconClassName="w-3 h-3" />
              <span className="pr-3 border-r">4.9 reviews</span>
              <span className="px-2">32 Stock</span>
            </div>

            {/* product price */}
            <div className="flex flex-col mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 font-semibold text-sm line-through">
                  $250
                </span>
                <span className="text-red-500 text-sm font-semibold">
                  (30% off)
                </span>
              </div>
              <h3 className="block leading-[48px]">$175</h3>
            </div>

            {/* product description */}
            <div className="my-3 mb-5">
              <p className="block text-xs text-gray-500 max-w-[650px] font-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolorum quidem veritatis dignissimos debitis eveniet possimus
                tenetur delectus vel sapiente ullam iusto illum consectetur
                voluptates necessitatibus molestiae, reiciendis vitae corporis
                mollitia?
              </p>
            </div>

            {/* product colors */}
            <div className="flex flex-wrap items-center gap-5">
              <h3 className="text-sm font-semibold text-gray-700">Colors</h3>
              <div className="flex flex-row gap-5">
                <ColorButton
                  className={`bg-blue-500 hover:outline-blue-200 ${
                    selColor === 0 ? 'outline-blue-200' : ''
                  }`}
                />
                <button className="w-6 h-6 rounded-full bg-blue-500 hover:outline-offset-2 hover:outline hover:outline-2 hover:outline-blue-200" />
                <button className="w-6 h-6 rounded-full bg-black/70 hover:outline-offset-2 hover:outline hover:outline-2 hover:outline-black/20" />
                <button className="w-6 h-6 rounded-full bg-yellow-500 hover:outline-offset-2 hover:outline hover:outline-2 hover:outline-yellow-200" />
                <button className="w-6 h-6 rounded-full bg-green-500 hover:outline-offset-2 hover:outline hover:outline-2 hover:outline-green-200" />
              </div>
            </div>

            {/* product sizes */}
            <div className="flex flex-col gap-2 mt-5">
              <h3 className="text-sm font-semibold text-gray-700">Sizes</h3>
              <div className="flex flex-row gap-5">
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:outline-offset-2 hover:outline hover:outline-2 hover:outline-gray-200">
                  <span className="text-sm font-semibold">S</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:outline-offset-2 hover:outline hover:outline-2 hover:outline-gray-200">
                  <span className="text-sm font-semibold">M</span>
                </button>

                <button className="w-10 h-10 rounded-full bg-gray-100 hover:outline-offset-2 hover:outline hover:outline-2 hover:outline-gray-200">
                  <span className="text-sm font-semibold">L</span>
                </button>
              </div>
            </div>

            {/* product quantity */}

            <div className="flex flex-col gap-2 mt-5">
              <h3 className="text-sm font-semibold text-gray-700">Quantity</h3>
              <Quantity
                qnt={quantity}
                setQnt={(qnt: number) => setQuantity(qnt)}
              />
            </div>

            {/* product add to cart */}
            <div className="flex gap-2 mt-5">
              <button className="w-full sm:w-fit px-5 h-10 text-sm rounded-md bg-blue-500 text-blue-50 font-medium hover:bg-blue-600/90">
                Add to Cart
              </button>

              <button className="w-full sm:w-fit px-5 h-10 text-sm rounded-md bg-green-500 text-green-50 font-medium hover:bg-green-600/90">
                Buy Now
              </button>
            </div>

            {/* product add to wishlist */}
            <div className="flex items-col mt-3 border-t border-dashed max-w-[600px] text-sm text-gray-500 py-2">
              <ul>
                <li className="flex items-center gap-2 mb-1.5">
                  <span className="text-slate-700">SKU : </span>
                  <span>DJI32342</span>
                </li>
                <li className="flex items-center gap-2 mb-1.5">
                  <span className="text-slate-700">Availbilty : </span>
                  <span className="text-blue-500 font-medium">In Stock</span>
                </li>

                <li className="flex items-center gap-2 mb-1.5">
                  <span className="text-slate-700">Categories : </span>
                  <span>Men, Fashion, New Trend</span>
                </li>

                <li className="flex items-center gap-2 mb-1.5">
                  <span className="text-slate-700">Tags : </span>
                  <span>Men, Fashion, New Trend</span>
                </li>
              </ul>
            </div>
          </div>

          {/* right side */}
          <div className="sm:border-none sm:block col-span-12 lg:col-span-3">
            {/* Delivery Info */}
            <div>
              <h6 className="block text-sm font-medium text-gray-400 mb-3">
                Delivery Info
              </h6>

              <div className="flex flex-col gap-4">
                {/* Delivery Location */}
                <div className="px-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="whitespace-nowrap text-gray-700 flex items-center gap-2">
                      <i className="fi fi-rr-marker -mb-1" />
                      <span className="block text-sm">Delivery Location</span>
                    </span>
                    <Link href="/" className="text-xs text-blue-400">
                      Change
                    </Link>
                  </div>

                  <address className="text-sm mt-2 text-gray-500 border border-dashed p-2">
                    123, Main Street, New York, USA
                  </address>
                </div>

                {/* Delivery Charge */}
                <div className="px-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-gray-700">
                      <span className="flex items-center gap-2">
                        <i className="fi fi-rr-truck-side" />
                        Standard Delivery
                      </span>
                      <span className="text-sm font-medium text-gray-700 block">
                        ( 3-5 days )
                      </span>
                    </span>

                    <span className="text-base font-medium text-gray-700">
                      $5.00
                    </span>
                  </div>

                  <div className="text-gray-500 border border-dashed p-2 mt-2">
                    <p className="text-xs ">
                      Enjoy free shipping promotion with minimum spend 7 items
                      in certain area from Music Mart.
                    </p>
                    <div className="text-[10px] mt-2 text-gray-500 bg-gray-100 p-2">
                      <p className="text-gray-700 font-medium">
                        <i className="fi fi-rr-info" />
                        <span className="ml-2">
                          Free shipping promotion is valid for standard delivery
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-3">
                  <div className="text-xs mt-2 text-gray-500 border border-dashed border-blue-100 bg-blue-50/10 p-2">
                    <p className="flex items-center gap-2 text-blue-400 font-medium">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </span>
                      <span className="ml-2">
                        Cash on delivery is available in certain area from Music
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Services
              </h3>

              <div className="flex flex-col gap-4">
                {/* Warranty */}
                <div className="px-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-gray-700 flex items-center gap-2">
                      <i className="fi fi-rr-shield-check" />
                      <span className="block">Warranty Not Availble</span>
                    </span>
                    <Link
                      href="/"
                      className="group relative text-xs whitespace-nowrap text-gray-500"
                    >
                      <i className="fi fi-rr-info" />
                      <span className="hidden group-hover:block text-[10px] px-2 bg-black/30 rounded-lg text-white absolute top-full right-0">
                        View Details
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="px-3">
                  <div className="flex justify-between gap-2">
                    <span className="text-sm text-gray-700 flex gap-2">
                      <i className="fi fi-rr-clock-three" />
                      <div>
                        <span className="block">7 days easy return</span>
                        <span className="block text-xs text-gray-400">
                          Change of mind is not applicable
                        </span>
                      </div>
                    </span>
                    <Link
                      href="/"
                      className="group relative h-fit text-xs whitespace-nowrap text-gray-500"
                    >
                      <i className="fi fi-rr-info" />
                      <span className="hidden group-hover:block text-[10px] px-2 bg-black/30 rounded-lg text-white absolute top-full right-0">
                        View Details
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="px-3">
                  <div className="flex justify-between gap-2">
                    <span className="text-sm text-gray-700 flex gap-2">
                      <i className="fi fi-rr-shield-plus" />
                      <div>
                        <span className="block">
                          100% Authenticity Guaranteed
                        </span>
                      </div>
                    </span>
                    <Link
                      href="/"
                      className="group relative h-fit text-xs whitespace-nowrap text-gray-500"
                    >
                      <i className="fi fi-rr-info" />
                      <span className="hidden group-hover:block text-[10px] px-2 bg-black/30 rounded-lg text-white absolute top-full right-0">
                        View Details
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails

const ColorButton = ({ className }: any) => {
  return (
    <button
      className={`w-6 h-6 rounded-full hover:outline-offset-2 hover:outline hover:outline-2 ${className}`}
    />
  )
}
