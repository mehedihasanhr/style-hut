import React from 'react';
import Rating from './Rating';

const Review = () => {
  return (
    <div className="p-4 border-b border-dashed rounded-md">
      <div className="flex items-center justify-between">
        <span className="flex items-center text-xs md:text-sm gap-2">
          <Rating
            rating={4.2}
            iconClassName="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4"
          />
          4.2
        </span>
        <div className="text-xs md:text-sm text-gray-600">
          12th April, 2021
        </div>
      </div>
      <h5 className="text-sm sm:text-base lg:text-lg font-medium text-gray-600 mt-2">
        Md Shohag Hossain
      </h5>

      <div className="text-xs text-gray-600 mt-2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam voluptates, quod, quia, voluptate
          quae voluptatem quibusdam voluptatibus quos quidem
          natus quas. Quisquam, quae. Quisquam voluptates,
          quod, quia, voluptate quae voluptatem quibusdam
          voluptatibus quos quidem natus quas. Quisquam,
          quae.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-3">
        <div className="flex items-center justify-center w-16 h-16 bg-slate-100">
          <div className="relative w-14 h-14 ">
            <img src="/cloths/sweater-1.png" alt="" />
          </div>
        </div>

        <div className="flex items-center justify-center w-16 h-16 bg-slate-100">
          <div className="relative w-14 h-14 ">
            <img src="/cloths/sweater-3.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
