import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Quantity from '../components/Quantity';
import Rating from '../components/Rating';
import Reviews from '../components/Reviews';
import Section from '../components/Section';
import Tabs from '../components/Tabs';
import Layout from '../layout/Layout';

import { selectProductById } from '../features/products/productsApiSlice';
import { useSelector } from 'react-redux';
import Image from '../components/Image';
import { calcDiscount } from '../utils/calcDiscount';

const ProductDetails = () => {
  const [qnt, setQnt] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const { productId } = useParams();

  // ui state
  const [showFullDesc, setShowFullDesc] = useState(false);

  // get product from store by id
  const product = useSelector((state) => selectProductById(state, productId));

  // destructure product
  const {
    _id,
    title,
    price,
    discount,
    images,
    variants,
    sizes,
    stock,
    tags,
    category,
    desc,
    short_desc,
  } = product;

  // set active image on product change
  useEffect(() => {
    if (product) {
      setActiveImage(images[0]);
      setSelectedVariant(variants[0]);
      setSelectedSize(sizes[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // handle select variant
  const handleSelectVariant = (variant) => {
    setSelectedVariant(variant);
    setActiveImage(variant);
  };

  // discount price
  const discountPrice = calcDiscount(price, discount);
  const discounted = price - discountPrice;

  // handle add to cart button
  const handleAddToCart = () => {
    const cart = {
      product: _id,
      quantity: qnt,
      total: discountPrice * qnt,
      extras: [
        { key: 'variant', value: selectedVariant },
        { key: 'size', value: selectedSize },
      ],
    };

    console.log(cart);
  };

  if (!product) return null;
  return (
    <Layout>
      <Section>
        <div>
          <div className="grid grid-cols-12 gap-y-8 md:gap-8">
            {/* Product Image */}
            <div className="col-span-12 lg:col-span-4">
              <div className="flex flex-col gap-4">
                <div className="relative w-full md:h-[400px] bg-gray-50 rounded-lg overflow-hidden p-4">
                  {activeImage ? (
                    <Image
                      src={`${process.env.REACT_APP_PUBLIC_URL}/${activeImage}`}
                      alt="shirt"
                      className="w-full h-full object-contain"
                      sizes="
                        (max-width: 640px) 250px,
                        (max-width: 768px) 300px,
                        (max-width: 1024px) 400px,
                        500px
                      "
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-md grid place-items-center animate-pulse">
                      <div>Loading...</div>
                    </div>
                  )}
                </div>

                {/* images */}
                <div className="flex items-center justify-center gap-3 md:gap-5">
                  {images.map((image) => (
                    <div
                      key={`image-${Math.random()}`}
                      className="w-10 h-10 md:w-16 md:h-16 bg-gray-300 rounded-md"
                      onClick={() => setActiveImage(image)}
                    >
                      <Image
                        src={`${process.env.REACT_APP_PUBLIC_URL}/${image}`}
                        alt="shirt"
                        className="w-full h-full object-contain"
                        sizes="80px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-span-12 lg:col-span-5">
              <div className="flex flex-col gap-2">
                <h6 className="text-xs text-gray-500">Man's Fashion</h6>
                <h4 className="xl:text-2xl lg:text-xl text-lg">{title}</h4>
                <div className="flex items-center gap-x-2 text-xs">
                  <Rating rating={4.5} iconClassName="w-3 h-3" />
                  <span className="font-medium text-black/80">
                    (22 Reviews)
                  </span>
                  <span className="ml-2 px-2 border-l text-red-500 font-medium">
                    {stock} stock
                  </span>
                </div>
                {/* price */}
                <div className="flex flex-col gap-y-3">
                  <div className="text-sm flex space-x-2">
                    <span className="text-sm line-through text-gray-500">
                      ${discounted.toFixed(2)}
                    </span>
                    <span className="text-red-500">({discount}% off)</span>
                  </div>
                  <h4 className="xl:text-2xl text-xl">
                    ${discountPrice.toFixed(2)}
                  </h4>
                </div>

                {/* short description */}
                <p className="text-xs text-black/80">{short_desc}</p>

                {/* color */}
                <div className="flex items-center gap-4 mt-3">
                  <h6 className="text-sm">Variants</h6>
                  <div className="flex gap-3 items-center">
                    {variants?.map((variant) => (
                      <div
                        key={`${product._id}-${Math.random()}`}
                        onClick={() => handleSelectVariant(variant)}
                        className={`w-10 h-10 rounded bg-gray-300 hover:ring-2 ring-blue-500 ring-offset-2 ${
                          variant === selectedVariant ? 'ring-2' : ''
                        }`}
                      >
                        <Image
                          src={`${process.env.REACT_APP_PUBLIC_URL}/${variant}`}
                          alt="shirt"
                          className="w-full h-full object-contain"
                          sizes="40px"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* size */}
                <div className="flex items-center gap-4 mt-3">
                  <h6 className="text-sm">Size</h6>
                  <div className="flex gap-3 items-center">
                    {product.sizes.map((size) => (
                      <button
                        key={`${size}-${Math.random()}`}
                        onClick={() => setSelectedSize(size)}
                        className={`w-8 h-8 rounded-full border text-sm font-medium hover:ring-2 ring-offset-2 ${
                          size === selectedSize && 'ring-2'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* quantity */}
                <div className="flex flex-col gap-2 mt-3">
                  <h6 className="text-sm">Quantity</h6>
                  <Quantity qnt={qnt} setQnt={setQnt} />
                </div>

                {/* button group */}
                <div className="flex items-center gap-3 mt-3">
                  <Button className="text-sm" onClick={handleAddToCart}>
                    <i className="fi fi-rr-shopping-cart -mb-1" />
                    Add to Cart
                  </Button>
                  <Button variant="success" className="text-sm">
                    <i className="fi fi-rr-wallet -mb-1" />
                    Buy Now
                  </Button>
                </div>

                <div className="border-t border-dashed mt-2 py-2">
                  <ul className="list-none text-xs flex flex-col gap-1">
                    <li className="">SKU: 123456</li>
                    <li className="flex items-center gap-2">
                      Availability:
                      {stock > 0 ? (
                        <span className="text-blue-600 font-bold">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold">
                          Out of stock
                        </span>
                      )}
                    </li>
                    <li className="">Categories: {category.main}</li>
                    <li className="">Tags: {tags?.join(', ')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="col-span-12 lg:col-span-3 border-l">
              <div className="px-4">
                <h6 className="text-sm text-gray-400">Delivery Info</h6>

                {/* delivery location */}
                <div className="flex items-center justify-between gap-x-2 text-sm mt-2">
                  <span className="mr-auto flex items-center gap-2">
                    <i className="fi fi-rr-marker -mb-1" />
                    Delivery Location
                  </span>

                  <Link
                    to="/"
                    className="text-blue-500 text-xs hover:underline"
                  >
                    Change
                  </Link>
                </div>

                {/* address */}
                <div className="border border-dashed p-2 text-xs rounded-md mt-2 text-gray-600">
                  <address>123, ABC Street, New York, USA</address>
                </div>

                {/* delivery time */}
                <div className="mt-3 text-sm flex items-center justify-between">
                  <div className="mb-2">
                    <div>
                      <i className="fi fi-rr-truck-side -mb-1" />
                      <span> Standard Delivery </span>
                    </div>
                    <span className="font-medium">(3-5 days)</span>
                  </div>
                  <h6 className="text-base"> $5.00</h6>
                </div>

                <div className="p-2 border border-dashed rounded-md text-xs flex flex-col gap-2">
                  <p>
                    Enjoy free shipping promotion with minimum spend 7 items in
                    certain area from Music Mart.
                  </p>

                  <div className="text-[10px] bg-slate-50 p-2 rounded-md">
                    <i className="fi fi-rr-clock -mb-1 mr-1" />
                    <span>
                      Free shipping promotion is valid for standard delivery
                    </span>
                  </div>
                </div>

                {/* Cash on delivery availability */}
                <div className="flex items-center gap-2 mt-3 px-2 py-3 text-blue-600 bg-slate-50 rounded-md">
                  <i className="fi fi-rr-money -mb-1" />
                  <span className="text-sm">Cash on delivery is available</span>
                </div>

                {/* service */}
                <div className="mt-4">
                  <h6 className="text-sm text-gray-400 mt-3">Service</h6>
                  <div className="flex flex-col gap-y-4 my-3">
                    <div className="flex items-center justify-between text-sm gap-2">
                      <i className="fi fi-rr-shield-check -mb-1" />
                      <span className="mr-auto">Warranty Not Available</span>
                      <i className="fi fi-rr-info -mb-1" />
                    </div>

                    <div className="flex justify-between text-sm gap-2">
                      <i className="fi fi-rr-clock -mb-1" />
                      <div className="flex flex-col mr-auto">
                        <span className="">7 Days Easy Return</span>
                        <span className="text-xs text-gray-400">
                          Change of mind is not applicable
                        </span>
                      </div>
                      <i className="fi fi-rr-info -mb-1" />
                    </div>

                    <div className="flex items-center justify-between text-sm gap-2">
                      <i className="fi fi-rr-shield-plus -mb-1" />
                      <span className="mr-auto">
                        100% Authenticity Guaranteed
                      </span>
                      <i className="fi fi-rr-info -mb-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* product description */}
      <Section>
        <Tabs>
          <Tabs.Panel label="Description">
            <p
              className={`text-xs md:text-sm text-gray-500 ${
                showFullDesc ? '' : 'line-clamp-[10]'
              }`}
            >
              {product.desc}
            </p>
            <span
              className="block text-xs font-medium mt-2 text-blue-700 hover:underline hover:cursor-pointer"
              onClick={() => setShowFullDesc(!showFullDesc)}
            >
              {showFullDesc ? 'Show less' : 'Show more'}
            </span>
          </Tabs.Panel>

          {/* specifications */}
          <Tabs.Panel label="Specifications">
            <table className="table-auto w-full  border-collapse">
              <tbody>
                {product.specifications?.map((spec) => (
                  <tr
                    key={`spec-${Math.random()}`}
                    className="odd:bg-[#fafbfd]"
                  >
                    <td className="border border-gray-100 min-w-[80px] md:min-w-[150px] py-2 px-3 text-xs md:text-sm text-gray-700">
                      {spec.key}
                    </td>
                    <td className="border border-gray-100 py-2 px-3 text-xs md:text-sm text-gray-700 whitespace-normal">
                      {spec.val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tabs.Panel>
        </Tabs>
      </Section>

      {/* Reviews */}
      <Section>
        <Reviews />
      </Section>
    </Layout>
  );
};

export default ProductDetails;
