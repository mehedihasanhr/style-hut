import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Quantity from '../components/Quantity';
import Rating from '../components/Rating';
import Reviews from '../components/Reviews';
import Section from '../components/Section';
import Tabs from '../components/Tabs';
import Layout from '../layout/Layout';

const ProductDetails = () => {
  const [qnt, setQnt] = useState(1);

  // ui state
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <Layout>
      <Section>
        <div>
          <div className="grid grid-cols-12 gap-y-8 md:gap-8">
            {/* Product Image */}
            <div className="col-span-12 lg:col-span-4">
              <div className="flex flex-col gap-4">
                <div className="w-full md:h-[400px] bg-gray-50 rounded-lg overflow-hidden p-4">
                  <img
                    src="/images/shoes.png"
                    alt="shirt"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* images */}
                <div className="flex items-center justify-center gap-3 md:gap-5">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-300 rounded-md"></div>
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-300 rounded-md"></div>
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-300 rounded-md"></div>
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-300 rounded-md"></div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-span-12 lg:col-span-5">
              <div className="flex flex-col gap-2">
                <h6 className="text-xs text-gray-500">
                  Man's Fashion
                </h6>
                <h4 className="xl:text-2xl lg:text-xl text-lg">
                  Shirt 1 men's fetions Shirt 1 men's
                  fetions
                </h4>
                <div className="flex items-center gap-x-2 text-xs">
                  <Rating
                    rating={4.5}
                    iconClassName="w-3 h-3"
                  />
                  <span className="font-medium text-black/80">
                    (22 Reviews)
                  </span>
                  <span className="ml-2 px-2 border-l text-red-500 font-medium">
                    32 stock
                  </span>
                </div>
                {/* price */}
                <div className="flex flex-col gap-y-3">
                  <div className="text-sm flex space-x-2">
                    <span className="text-sm line-through text-gray-500">
                      $3.00
                    </span>
                    <span className="text-red-500">
                      (30% off)
                    </span>
                  </div>
                  <h4 className="xl:text-2xl text-xl">
                    $20.00
                  </h4>
                </div>

                {/* short description */}
                <p className="text-xs text-black/80">
                  Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quisquam, quod
                  voluptatum. Quisquam, quod voluptatum.
                  Quisquam, quod voluptatum. Quisquam, quod
                  voluptatum.
                </p>

                {/* color */}
                <div className="flex items-center gap-4 mt-3">
                  <h6 className="text-sm">Variants</h6>
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded bg-gray-300 hover:ring-2 ring-blue-500 ring-offset-2"></div>
                    <div className="w-10 h-10 rounded bg-gray-300 hover:ring-2 ring-blue-500 ring-offset-2"></div>
                    <div className="w-10 h-10 rounded bg-gray-300 hover:ring-2 ring-blue-500 ring-offset-2"></div>
                    <div className="w-10 h-10 rounded bg-gray-300 hover:ring-2 ring-blue-500 ring-offset-2"></div>
                  </div>
                </div>

                {/* size */}
                <div className="flex items-center gap-4 mt-3">
                  <h6 className="text-sm">Size</h6>
                  <div className="flex gap-3 items-center">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={`${size}-${Math.random()}`}
                        className="w-8 h-8 rounded-full border text-sm font-medium hover:ring-2 ring-offset-2"
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
                  <Button className="text-sm">
                    <i className="fi fi-rr-shopping-cart -mb-1" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="success"
                    className="text-sm"
                  >
                    <i className="fi fi-rr-wallet -mb-1" />
                    Buy Now
                  </Button>
                </div>

                <div className="border-t border-dashed mt-2 py-2">
                  <ul className="list-none text-xs flex flex-col gap-1">
                    <li className="">SKU: 123456</li>
                    <li className="flex items-center gap-2">
                      Availability:
                      <span className="text-blue-600 font-bold">
                        In Stock
                      </span>
                    </li>
                    <li className="">Categories: Cloths</li>
                    <li className="">
                      Tags: Men, Fashion, New Trend
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="col-span-12 lg:col-span-3 border-l">
              <div className="px-4">
                <h6 className="text-sm text-gray-400">
                  Delivery Info
                </h6>

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
                  <address>
                    123, ABC Street, New York, USA
                  </address>
                </div>

                {/* delivery time */}
                <div className="mt-3 text-sm flex items-center justify-between">
                  <div className="mb-2">
                    <div>
                      <i className="fi fi-rr-truck-side -mb-1" />
                      <span> Standard Delivery </span>
                    </div>
                    <span className="font-medium">
                      (3-5 days)
                    </span>
                  </div>
                  <h6 className="text-base"> $5.00</h6>
                </div>

                <div className="p-2 border border-dashed rounded-md text-xs flex flex-col gap-2">
                  <p>
                    Enjoy free shipping promotion with
                    minimum spend 7 items in certain area
                    from Music Mart.
                  </p>

                  <div className="text-[10px] bg-slate-50 p-2 rounded-md">
                    <i className="fi fi-rr-clock -mb-1 mr-1" />
                    <span>
                      Free shipping promotion is valid for
                      standard delivery
                    </span>
                  </div>
                </div>

                {/* Cash on delivery availability */}
                <div className="flex items-center gap-2 mt-3 px-2 py-3 text-blue-600 bg-slate-50 rounded-md">
                  <i className="fi fi-rr-money -mb-1" />
                  <span className="text-sm">
                    Cash on delivery is available
                  </span>
                </div>

                {/* service */}
                <div className="mt-4">
                  <h6 className="text-sm text-gray-400 mt-3">
                    Service
                  </h6>
                  <div className="flex flex-col gap-y-4 my-3">
                    <div className="flex items-center justify-between text-sm gap-2">
                      <i className="fi fi-rr-shield-check -mb-1" />
                      <span className="mr-auto">
                        Warranty Not Available
                      </span>
                      <i className="fi fi-rr-info -mb-1" />
                    </div>

                    <div className="flex justify-between text-sm gap-2">
                      <i className="fi fi-rr-clock -mb-1" />
                      <div className="flex flex-col mr-auto">
                        <span className="">
                          7 Days Easy Return
                        </span>
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
              Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Vivamus mollis quam purus, et
              euismod quam maximus et. Vestibulum iaculis
              neque ac ligula pretium, ac posuere ex
              convallis. Donec tincidunt lobortis dui, ut
              tempus nisl faucibus id. Aliquam volutpat
              lobortis vehicula. Cras in rutrum diam. Morbi
              efficitur consequat faucibus. Sed nec lobortis
              orci, nec mattis nunc. Sed viverra vestibulum
              neque elementum facilisis. Vestibulum faucibus
              lorem id iaculis placerat. Aenean id sodales
              nibh, vel faucibus sem. Mauris non purus id
              velit dapibus porta. Sed tincidunt odio dolor,
              ut venenatis nisi fringilla ac. Pellentesque
              laoreet ligula eu nibh sollicitudin maximus.
              Aenean dapibus lectus eget nulla pulvinar
              tincidunt. Suspendisse vehicula urna enim, sit
              amet fermentum est tincidunt eget. Etiam id
              iaculis tellus, eu condimentum massa. Vivamus
              ultricies arcu orci, a bibendum eros eleifend
              a. Fusce in enim sit amet odio pretium
              accumsan ut vel lorem. Nam pulvinar magna sit
              amet enim euismod volutpat. Sed pharetra orci
              a est venenatis, id venenatis neque vulputate.
              Sed ut metus vel metus tincidunt euismod eget
              in tellus. Vestibulum a sagittis eros, et
              mattis urna. Cras et dapibus elit. Aliquam eu
              tellus odio. Ut ut gravida orci, in congue
              tellus. Proin sed diam a mi maximus finibus.
              Curabitur ac dignissim ex. Nulla tempus, metus
              at vulputate placerat, mauris metus varius
              elit, convallis aliquet eros sapien ut erat.
              Pellentesque habitant morbi tristique senectus
              et netus et malesuada fames ac turpis egestas.
              Sed lacinia accumsan placerat. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit.
              Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos
              himenaeos. Nam in massa sit amet purus auctor
              accumsan. Phasellus scelerisque turpis et dui
              tincidunt, eu semper leo porttitor. In id
              ornare nisl, a fermentum orci. Curabitur
              imperdiet dui neque, eget pellentesque odio
              fringilla eu. Nullam blandit mattis fermentum.
              Nam in elit quis augue tempus volutpat non
              quis lectus. Suspendisse bibendum non mi sit
              amet fringilla. Curabitur nec magna dui. Donec
              tempus, odio eget hendrerit scelerisque, diam
              tellus hendrerit eros, vel tincidunt justo
              velit non velit. Integer lacinia, nunc
              bibendum ornare pharetra, urna lorem convallis
              tortor, eget malesuada urna lacus eget ipsum.
              Proin ut eros convallis neque pellentesque
              vulputate. Aliquam erat volutpat. Sed
              hendrerit gravida elit, vitae cursus nisi.
              Aliquam porttitor mauris eget neque mollis
              dictum.
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
            <table className="table-auto w-fit border-collapse">
              <tbody>
                {[...Array(10)].map((_, i) => (
                  <tr key={i} className="odd:bg-[#fafbfd]">
                    <td className="border border-gray-100 min-w-[80px] md:min-w-[150px] py-2 px-3 text-xs md:text-sm text-gray-700">
                      Title
                    </td>
                    <td className="border border-gray-100 py-2 px-3 text-xs md:text-sm text-gray-700 whitespace-normal">
                      Shirt 1 men's fetions Shirt 1 men's
                      fetions Shirt 1 men's fetions Shirt 1
                      men's fetions
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
