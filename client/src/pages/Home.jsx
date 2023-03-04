import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Layout from '../layout/Layout'

const FourImageCard = ({ title, images, path = '/' }) => {
  return (
    <Link to={path} className="cursor-default">
      <div className="p-5 bg-[#f7f8fa] hover:bg-[#f2f5f7] rounded-lg h-full">
        <div className="text-xs sm:text-sm md:text-base font-bold">{title}</div>
        <div className="grid grid-cols-2 gap-4 py-3">
          {images.map((image, index) => (
            <div className="col-span-1" key={index}>
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}

const Home = () => {
  return (
    <Layout>
      <Hero />
      {/* categories */}
      <Section>
        <h5 className=" mb-4">Categories</h5>
        <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-[20px] lg:gap-[32px]">
          {/* 4 image man fashion category card */}
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <FourImageCard
              path="/"
              title={"Man's Fashion"}
              images={['/images/watch.png', '/images/t-shirt.png', '/images/shoes-1.png', '/images/sun-glass-1.png']}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <FourImageCard
              path="/"
              title={"Woman's Fashion"}
              images={[
                '/images/w-watch-1.png',
                '/images/w-cloth0.png',
                '/images/w-shoes-1.png',
                '/images/w-sun-glass-1.png',
              ]}
            />
          </div>

          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <FourImageCard
              path="/"
              title={'Electronics'}
              images={['/images/b-set.png', '/images/wasing-1.png', '/images/catle9.png', '/images/multi-cooker-1.png']}
            />
          </div>

          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <FourImageCard
              path="/"
              title={'Computer Accessories'}
              images={['/images/monitor-1.png', '/images/keyboard-1.png', '/images/mouse-1.png', '/images/headset.png']}
            />
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-12 grid grid-cols-12 gap-2 sm:gap-4 md:gap-5 lg:gap-8">
            {/* 1 image man fashion category card */}
            <div className="col-span-8 lg:col-span-4">
              <Link to="/" className="cursor-default">
                <div className="bg-[#f7f8fa] hover:bg-[#f2f5f7] rounded-lg relative group overflow-hidden">
                  <img src="/images/tree-table-1.png" alt="" />
                  <div className="absolute top-0 left-0 w-full h-full group-hover:bg-black/30 p-2 md:p-4">
                    <div className="text-white text-sm sm:text-sm md:text-base font-bold">Home & Garden</div>
                  </div>
                </div>
              </Link>
            </div>
            {/* 1 image man fashion category card */}
            <div className="col-span-4 lg:col-span-2">
              <Link to="/" className="cursor-default">
                <div className="bg-[#f7f8fa] hover:bg-[#f2f5f7] rounded-lg group relative overflow-hidden">
                  <img src="/images/makup.png" alt="" />
                  <div className="absolute top-0 left-0 w-full h-full group-hover:bg-black/30 p-2 md:p-4">
                    <div className="text-white text-xs sm:text-sm md:text-base font-bold"> Beauty & Health</div>
                  </div>
                </div>
              </Link>
            </div>
            {/* 1 image man fashion category card */}
            <div className="col-span-4 lg:col-span-2 h-full">
              <Link to="/" className="cursor-default">
                <div className="bg-[#f7f8fa] relative hover:bg-[#f2f5f7] group rounded-lg overflow-hidden">
                  <img src="/images/furniture.png" alt="" />
                  <div className="absolute top-0 left-0 w-full h-full group-hover:bg-black/30 p-2 md:p-4">
                    <div className="text-white text-xs sm:text-sm md:text-base font-bold"> Furniture</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* 1 image man fashion category card */}
            <div className="col-span-8 lg:col-span-4">
              <Link to="/" className="cursor-default">
                <div className="bg-[#f7f8fa] hover:bg-[#f2f5f7] relative group rounded-lg overflow-hidden">
                  <img src="/images/food.png" alt="" />
                  <div className="absolute top-0 left-0 w-full h-full group-hover:bg-black/30 p-2 md:p-4">
                    <div className="text-white text-xs sm:text-sm md:text-base font-bold">Fresh Food</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* trending products */}
      <Section>
        <h5 className="mb-4">Trending Products</h5>
      </Section>
    </Layout>
  )
}

export default Home
