import Image from 'next/image'

type TBannerProps = {
  src: string
  alt: string
}

const Banner = ({ src, alt }: TBannerProps) => {
  return (
    <section className="mb-5 md:mb-[100px]">
      <div className="container">
        <div className="relative min-w-full h-24 sm:h-52">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="
                (max-width: 640px) 100vw,
                (max-width: 768px) 50vw,
                (max-width: 1024px) 33.3vw,
            "
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default Banner
