import Image from 'next/image'
import Sliders from '../components/Sliders'
import Slide from '../components/Sliders/Slide'

const Hero = () => {
  return (
    <section id="#hero-section" className="w-full h-fit p-4 mb-8 md:mb-[100px]">
      <div className="container p-0 sm:p-4">
        <div className="grid grid-cols-12 md:grid-rows-2 gap-3 md:gap-5 ">
          <div className="col-span-12 md:col-span-8 row-span-1 md:row-span-2">
            <div className="relative min-w-full min-h-full h-[130px] sm:h-[200px] lg:h-[300px] xl:h-[400px]">
              <Sliders>
                <Slide className="h-[130px] sm:h-[200px] lg:h-[300px] xl:h-[400px]">
                  <Image
                    src="/banner-1.jpg"
                    alt=""
                    fill
                    sizes="
                    (max-width: 1536px) 450px,
                    
                  "
                    priority // this is the important part
                  />
                </Slide>

                <Slide className="h-[130px] sm:h-[200px] lg:h-[300px] xl:h-[400px]">
                  <Image
                    src="/banner-2.jpg"
                    alt=""
                    fill
                    sizes="
                    (max-width: 1536px) 450px,
                  "
                    priority
                  />
                </Slide>

                <Slide className="h-[130px] sm:h-[200px] lg:h-[300px] xl:h-[400px]">
                  <Image
                    src="/banner-6.jpg"
                    alt=""
                    fill
                    sizes="
                    (max-width: 1536px) 450px,
                  "
                    priority
                  />
                </Slide>

                <Slide className="h-[130px] sm:h-[200px] lg:h-[300px] xl:h-[400px]">
                  <Image
                    src="/banner-4.jpg"
                    alt=""
                    fill
                    sizes="
                    (max-width: 1536px) 450px,
                  "
                    priority
                  />
                </Slide>
              </Sliders>
            </div>
          </div>

          {/*  */}
          <div className="col-span-6 md:col-span-4 row-span-1 ">
            <div className="relative w-full h-20 md:h-full md:min-h-full">
              <Image
                src="/banner-3.jpg"
                alt=""
                fill
                sizes="
                (max-width: 1536px) 350px,
              "
                priority
              />
            </div>
          </div>

          {/*  */}
          <div className="col-span-6 md:col-span-4 row-span-1 ">
            <div className="relative w-full h-20 md:h-full md:min-h-full">
              <Image
                src="/banner-5.jpg"
                alt=""
                fill
                sizes="
                (max-width: 1536px) 350px,
              "
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
