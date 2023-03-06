import Rating from '../components/Rating'
import Section from '../components/Section'
import Layout from '../layout/Layout'

const ProductDetails = () => {
  return (
    <Layout>
      <Section>
        <div>
          <div className="grid grid-cols-12 gap-8">
            {/* Product Image */}
            <div className="col-span-12 lg:col-span-4">
              <div className="flex flex-col gap-4">
                <div className="w-full h-[400px] bg-gray-50 rounded-lg overflow-hidden p-4">
                  <img src="/images/shoes.png" alt="shirt" className="w-full h-full object-contain" />
                </div>

                {/* images */}
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-slate-100 rounded-md"></div>
                  <div className="w-16 h-16 bg-slate-100 rounded-md"></div>
                  <div className="w-16 h-16 bg-slate-100 rounded-md"></div>
                  <div className="w-16 h-16 bg-slate-100 rounded-md"></div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-span-12 lg:col-span-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-xs text-gray-500"> Man's Fashion</h6>
                <h4>Shirt 1 men's fetions Shirt 1 men's fetions</h4>
                <div className="flex items-center gap-x-2 text-xs">
                  <Rating rating={4.5} iconClassName="w-3 h-3" />
                  <span className="font-medium text-black/80">(22 Reviews)</span>
                  <span className="ml-2 px-2 border-l text-black/80 font-medium">32 stock</span>
                </div>
                {/* price */}
                <div className="flex flex-col">
                  <div className="text-xs">
                    <span className="text-xs"> $250 </span>
                    <span className="text-red-500">(30% off)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="col-span-12 lg:col-span-3 border-l"></div>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export default ProductDetails
