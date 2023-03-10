import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div className="border border-dashed rounded-md p-3 hover:border-blue-300">
      {/* image */}
      <div className="w-full h-[130px] md:h-[170px] relative overflow-hidden">
        <span className="text-xs md:text-sm font-bold bg-green-500 text-white px-1.5 py-0.5 rounded-md absolute top-1 left-1">
          30%
        </span>
        <img
          src="/images/shirt.png"
          alt=""
          width={100}
          height={100}
          className="w-full h-full object-contain"
        />
      </div>

      {/* cart text */}
      <div className="relative pt-4 pb-0 md:pb-4">
        <Link
          to="/product/640860eca7e788c30623fc0c"
          className="line-clamp-2 text-sm md:text-base mb-1.5 text-black/80 hover:text-blue-600"
        >
          High Quality Black T-shirt for man
        </Link>
        <Rating
          rating={4}
          iconClassName="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5"
        />
        <h5 className="mt-2.5 text-sm sm:text-lg">
          $20.00{' '}
          <sub className="text-red-500 text-sm line-through">
            $3.00
          </sub>
        </h5>

        {/* cart button */}
        <button className="absolute right-0 bottom-0 w-8 h-8 md:w-10 md:h-10 hidden md:flex items-center justify-center bg-blue-50 text-blue-500 rounded-md hover:bg-blue-500 hover:text-blue-50 transition-colors duration-300">
          <i className="fi fi-rr-shopping-cart-add text-xl -mb-1" />
        </button>
      </div>
    </div>
  );
};

export default Product;
