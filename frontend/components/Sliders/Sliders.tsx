import React from 'react'
import style from './slider.module.css'
import { SlideWrapper } from './SlideWrapper'

interface ISliders {
  children: React.ReactNode | React.ReactNode[]
  prevButton?: (prevSlide: (e: any) => void, style: string) => React.ReactNode
  nextButton?: (nextSlide: (e: any) => void, style: string) => React.ReactNode
  autoPlay?: boolean
}

const Sliders = ({
  children,
  prevButton,
  nextButton,
  autoPlay = true,
  ...props
}: ISliders) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [prev, setPrev] = React.useState(-1)
  const [next, setNext] = React.useState(1)
  const [jump, setJump] = React.useState(false)
  const [jumpTo, setJumpTo] = React.useState(0)
  const [touch, setTouch] = React.useState(false)
  const childs = React.Children.toArray(children)

  // auto play slider
  React.useEffect(() => {
    if (!jump || (!touch && autoPlay)) {
      const interval = setInterval(() => {
        setPrev(activeIndex)
        setActiveIndex(next)
        setNext((st) => (st === childs.length - 1 ? 0 : st + 1))
      }, 5000)

      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, prev, next, jump, touch])

  // auto play slider
  React.useEffect(() => {
    setPrev(jumpTo - 1)
    setActiveIndex(jumpTo)
    jumpTo === childs.length - 1 ? setNext(0) : setNext(jumpTo + 1)

    setJump(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jumpTo, jump])

  // next slide
  const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (activeIndex < childs.length - 1) {
      setPrev(activeIndex < 0 ? childs.length - 1 : activeIndex)
      setActiveIndex(next)
      setNext((st) => (st === childs.length - 1 ? 0 : st + 1))
    }
  }

  // prev slide
  const prevSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (prev >= 0) {
      setPrev((prev) => (prev < 0 ? childs.length - 1 : prev - 1))
      setActiveIndex(prev)
      setNext(activeIndex)
    }
  }

  // jump to slide
  const jumpToSlide = (index: number) => {
    setJumpTo(index)
    setJump(true)
  }

  // touch events
  const [touchStart, setTouchStart] = React.useState(0)
  const [touchEnd, setTouchEnd] = React.useState(0)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX)
    setTouch(true)
    setJump(false)

    // console.log('start', touchStart)
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.changedTouches[0].clientX)
    // console.log('end', touchEnd)

    if (touchStart - touchEnd > 100) {
      nextSlide(e as any)
    }

    if (touchStart - touchEnd < -100) {
      prevSlide(e as any)
    }

    setTouch(false)
  }

  return (
    <div className="relative w-full h-full">
      {/* sliders */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-full overflow-hidden"
      >
        {childs.map((child, index) => (
          <SlideWrapper
            currentSlide={activeIndex}
            prev={prev}
            next={next}
            index={index}
            key={index}
            jump={jump}
          >
            {child}
          </SlideWrapper>
        ))}
      </div>

      <div className="flex space-x-3 items-center absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        {childs.map((_, index) => (
          <button
            aria-labelledby="slideIndicator"
            tabIndex={-1}
            type="button"
            key={index}
            onClick={() => jumpToSlide(index)}
            className={`w-3 h-3  backdrop-blur-lg rounded-full border-2 border-white/70 ${
              activeIndex === index ? 'bg-white/80' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* prevButton */}
      {prevButton ? (
        prevButton(prevSlide, 'absolute h-full left-0 top-0 w-10 bg-black/20')
      ) : (
        <button
          aria-labelledby="prevSlide"
          tabIndex={-1}
          type="button"
          onClick={prevSlide}
          className="z-10 group absolute h-full left-0 top-0 w-10 bg-black/0 hover:bg-black/20 transition-all ease-linear duration-300"
        >
          <i className="fi fi-rr-angle-left text-white/0 group-hover:text-white" />
        </button>
      )}

      {/* next button */}
      {nextButton ? (
        nextButton(nextSlide, 'absolute h-full left-0 top-0 w-10 bg-black/20')
      ) : (
        <button
          aria-labelledby="prevSlide"
          tabIndex={-1}
          type="button"
          className="z-10 group absolute h-full right-0 top-0 w-10 bg-black/0 hover:bg-black/20 transition-all ease-linear duration-300"
          onClick={nextSlide}
        >
          <i className="fi fi-rr-angle-right text-white/0 group-hover:text-white" />
        </button>
      )}
    </div>
  )
}

export default Sliders
