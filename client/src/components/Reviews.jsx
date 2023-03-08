import React from 'react';
// import Pagination from '../components/Pagination';
import Rating from '../components/Rating';
import Review from '../components/Review';
import Section from './Section';

// Rating Progress...
const RatingProgress = ({ rating, totalRating, total }) => {
  const percentage =
    total === 0
      ? 0
      : Math.ceil((totalRating / total) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="w-20 text-sm md:text-base text-right whitespace-nowrap">
        {rating} stars
      </span>
      <div className="w-20 md:w-64 h-2 rounded-full bg-gray-200">
        <div
          style={{ width: `${percentage}%` }}
          className={`h-full bg-yellow-500 drop-shadow-[0_0px_2px_rgba(250,204,21,0.55)] rounded-full`}
        />
      </div>
      <span className="w-12 text-sm md:text-base">
        {percentage}%
      </span>
    </div>
  );
};

// Reviews...
const Reviews = () => {
  //   const [currentPage, setCurrentPage] = React.useState(1);
  return (
    <Section className="">
      <div className="py-8 border-t border-dashed">
        <div>
          <h5>Ratings & Reviews</h5>
          <div className="py-8 flex items-center gap-10 border-b border-dashed">
            <div className="">
              <div>
                <h1 className="md:text-5xl font-medium">
                  4.2{' '}
                  <sub className="text-sm md:text-2xl text-gray-600">
                    /5
                  </sub>
                </h1>
                <Rating className="mt-2" rating={4.2} />
                <div className="flex items-center text-sm mt-2">
                  77 Ratings
                </div>
              </div>
            </div>

            <div className="md:ml-10">
              <div className="md:w-72">
                <RatingProgress
                  rating={5}
                  totalRating={180}
                  total={300}
                />
                <RatingProgress
                  rating={4}
                  totalRating={100}
                  total={300}
                />
                <RatingProgress
                  rating={3}
                  totalRating={12}
                  total={300}
                />
                <RatingProgress
                  rating={2}
                  totalRating={8}
                  total={300}
                />
                <RatingProgress
                  rating={1}
                  totalRating={0}
                  total={300}
                />
              </div>
            </div>
          </div>
          {/* reviews */}

          <div className="flex flex-col gap-3 mt-5">
            {[1, 2, 3, 4].map((item) => (
              <Review key={item} />
            ))}

            <div className="flex items-center justify-end">
              {/* <Pagination
                viewParPage={4}
                totalItems={100}
                currentPage={currentPage}
                onPageChange={(page) =>
                  setCurrentPage(page)
                }
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Reviews;
