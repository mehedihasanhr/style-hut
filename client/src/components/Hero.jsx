import { useGetSlidersQuery } from '../features/sliders/sliderApiSlice'
import Carousel from './Carousel'
import Image from './Image'
import Section from './Section'

const Hero = () => {
  const { data, isLoading } = useGetSlidersQuery({
    refetchOnMountOrArgChange: true,
  })
  const { data: sliders } = data || {}
  return (
    <Section>
      <div>
        {isLoading || sliders?.length === 0 ? (
          <div className="h-40 sm:h-60 lg:h-80 bg-slate-200 flex items-center justify-center animate-pulse rounded-lg">
            <span className="text-black text-lg font-medium">Loading...</span>
          </div>
        ) : (
          <Carousel>
            {sliders?.map(({ _id, slider, active }) =>
              active ? (
                <div key={_id} className="h-40 sm:h-60 lg:h-80 relative overflow-hidden rounded-lg">
                  <Image
                    src={`http://localhost:5000/statics/${slider.filename}`}
                    alt={slider.originalname}
                    sizes="(max-width: 400px) 320px,(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px"
                  />
                </div>
              ) : null,
            )}
          </Carousel>
        )}
      </div>
    </Section>
  )
}

export default Hero
