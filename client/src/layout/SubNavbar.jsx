import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from '../components/Dropdown'
import MegaMenu from '../components/MegaMenu'

const subNavItems = [
  { name: 'Electronic & computers', path: '/' },
  { name: "Woman's Fashions", path: '/' },
  { name: "Man's Fashions", path: '/' },
  { name: "Today's deals", path: '/' },
  { name: 'Customer Service', path: '/' },
  { name: 'Gift Cards', path: '/' },
  { name: 'Sell', path: '/' },
  { name: 'Registry', path: '/' },
  { name: 'Affiliate Program', path: '/' },
]

const Indicator = ({ className = 'left-0', aria = 'left', onClick }) => {
  return (
    <button
      aria-describedby={`arrow-${aria}`}
      onClick={onClick}
      className={`px-3 py-1 h-8 bg-gray-100 absolute ${className} top-1/2 transform -translate-y-1/2 hover:cursor-pointer`}
    >
      <i className={`fi fi-br-angle-${aria} text-xs text-slate-700 -mb-1`} />
    </button>
  )
}

const SubNavbar = () => {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(0)
  const [scrollComplete, setScrollComplete] = React.useState(false)

  const scrollWidthRef = React.useRef(null)
  const scrollWrapperRef = React.useRef(null)

  // scroll to left
  const scrollLeft = () => {
    if (scrollWidthRef.current) {
      setScrollComplete(false)
      scrollWidthRef.current.scrollLeft -= 100
      setScrolled(scrollWidthRef.current.scrollLeft - 100)
    }
  }

  // scroll to right
  const scrollRight = () => {
    const scroll = scrollWidthRef.current
    if (scroll) {
      if (scroll.scrollLeft + 100 >= scroll.scrollWidth - scroll.clientWidth) {
        setScrollComplete(true)
      }
      scroll.scrollLeft += 100
      setScrolled(scroll.scrollLeft + 100)
    }
  }

  // scroll to left button
  const handleScrollLeft = (e) => {
    e.preventDefault()
    scrollLeft()
  }

  // scroll to right button
  const handleScrollRight = (e) => {
    e.preventDefault()
    scrollRight()
  }

  // touch event
  const handleTouch = (e) => {
    const scroll = scrollWidthRef.current
    let touchStart = 0
    let touchEnd = 0

    if (scroll) {
      touchStart = e.touches[0].clientX
      scroll.addEventListener('touchmove', (e) => {
        touchEnd = e.touches[0].clientX
        if (touchStart > touchEnd) {
          scrollRight()
        } else {
          scrollLeft()
        }
      })
    }
  }

  // handle scroll
  const handleScroll = () => {
    if (scrollWidthRef.current) {
      const scroll = scrollWidthRef.current
      if (scroll.scrollWidth <= scroll.clientWidth) {
        setScrollComplete(true)
      } else {
        setScrollComplete(false)
      }
    }
  }

  // on mount
  React.useEffect(() => {
    handleScroll()
  }, [])

  // on resize
  React.useEffect(() => {
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('resize', handleScroll)
    }
  }, [])
  return (
    <div className="container hidden lg:block">
      <div className="flex items-center space-x-5 h-8 relative">
        <Dropdown className="">
          <Dropdown.Toggle className="text-slate-700 text-sm hover:cursor-pointer">All Categories</Dropdown.Toggle>
          <Dropdown.Menu className="">
            <MegaMenu />
          </Dropdown.Menu>
        </Dropdown>
        <div className="relative flex items-center overflow-hidden w-full h-8" ref={scrollWrapperRef}>
          {/* sub menu hover controller button left ind. */}
          {scrolled > 0 ? <Indicator className="left-0" aria="left" onClick={handleScrollLeft} /> : null}
          {/* sub nav items */}
          <div
            className="w-full scroll-smooth flex items-center justify-between overflow-hidden flex-nowrap lg:space-x-6 "
            ref={scrollWidthRef}
            onTouchStart={handleTouch}
          >
            {subNavItems.map(({ name, path }) => (
              <Link
                to={path}
                key={Math.random()}
                className="text-sm text-slate-700 whitespace-nowrap hover:text-gray-700"
              >
                {name}
              </Link>
            ))}
          </div>
          {/* sub menu hover controller button right ind. */}
          {!scrollComplete ? <Indicator className="right-0" aria="right" onClick={handleScrollRight} /> : null}
        </div>
      </div>
    </div>
  )
}

export default SubNavbar
