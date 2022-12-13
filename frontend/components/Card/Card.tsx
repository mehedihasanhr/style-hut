import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Rating from '../Rating'

interface ICardProps {
  title: string
  image: string
  alt: string
  href: string
}

const Card = ({ title, image, alt = '', href = '/', ...props }: ICardProps) => {
  return (
    <Link href={href}>
      <div className="relative w-full rounded-lg overflow-hidden bg-white border border-dashed hover:border-blue-300">
        <div className="absolute top-3 right-3 z-10 p-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xs sm:text-sm font-bold rounded-full bg-yellow-50 text-yellow-600">
          30%
        </div>
        <div className="py-3 px-5 md:px-2 w-full min-w-full h-32 sm:h-[180px] md:h-52 xl:h-60 overflow-hidden">
          <div className="relative w-full min-w-full h-32 sm:h-[180px] md:h-52 xl:h-60">
            {image ? (
              <Image src={image} alt={alt} fill sizes="150px" loading="lazy" />
            ) : null}
          </div>
        </div>
        <div className="py-2 sm:py-4 px-3 relative">
          <h6 className="font-normal text-xs sm:text-sm md:text-base mb-2 text-gray-700 line-clamp-2 sm:line-clamp-1">
            {title}
          </h6>
          <div>
            <Rating
              rating={4}
              iconClassName="w-[10px] h-[10px] sm:w-3 sm:h-3 md:w-[14px] md:h-[14px]"
            />
          </div>

          <div className="pt-2">
            <h4 className="text-slate-700 text-base md:text-xl ">
              $200
              <sub>
                <span className="text-red-300 font-medium px-2">
                  <del>$250</del>
                </span>
              </sub>
            </h4>
          </div>

          <button
            aria-describedby="AddToCartIcon"
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-50 hover:bg-blue-100 text-blue-500 text-lg absolute right-3 bottom-3"
          >
            <i className="fi fi-rr-shopping-cart-add -mb-1" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default Card
