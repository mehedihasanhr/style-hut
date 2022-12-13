import Link from 'next/link'
import React, { ButtonHTMLAttributes } from 'react'
import Dropdown from '../Dropdown'
import { AllCategoryMegaMenu } from './AllCategoryMegaMenu'

const SubNav = () => {
  const [scrolled, setScrolled] = React.useState(0)
  const [scrollComplete, setScrollComplete] = React.useState(false)

  const scrollWidthRef = React.useRef<HTMLDivElement>(null)
  const scrollWrapperRef = React.useRef<HTMLDivElement>(null)

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
  const handleScrollLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    scrollLeft()
  }

  // scroll to right button
  const handleScrollRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    scrollRight()
  }

  // touch event
  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
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
    <div className="hidden md:block w-full bg-white border-dashed">
      <div className="container py-1">
        <div className="flex items-center flex-nowrap lg:space-x-6 overflow-hidden">
          <Dropdown>
            <Dropdown.Toggle>
              <Link
                href="/"
                className="flex items-center px-2 py-1 text-sm space-x-1 text-gray-500 hover:text-gray-700 whitespace-nowrap"
              >
                <span>All Category</span>
                <i className="fi fi-rr-angle-small-down -mb-1.5 text-xs" />
              </Link>
            </Dropdown.Toggle>

            {/* Dropdown Menu */}
            <Dropdown.Menu className="w-full container mt-1.5">
              <AllCategoryMegaMenu />
            </Dropdown.Menu>
          </Dropdown>
          <div
            className="relative flex items-center overflow-hidden w-full"
            ref={scrollWrapperRef}
          >
            {scrolled > 0 ? (
              <div className="absolute top-0 left-0 w-8 h-full bg-white/40 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={handleScrollLeft}
                  className=" z-10 flex items-center justify-center rounded-r-sm w-full text-sm h-full hover:bg-slate-100"
                >
                  <i className="fi fi-rr-angle-small-left" />
                </button>
              </div>
            ) : null}
            <div
              className="w-full scroll-smooth flex items-center overflow-hidden flex-nowrap lg:space-x-6 "
              ref={scrollWidthRef}
              onTouchStart={handleTouch}
            >
              <NavLink href="/">{'Electronics & Computers'}</NavLink>
              <NavLink href="/">{"Women's Fashion"}</NavLink>
              <NavLink href="/">{"Men's Fashion"}</NavLink>
              <NavLink href="/">{'Baby, Kids & Toys'}</NavLink>
              <NavLink href="/">{"Today's Deals"}</NavLink>
              <NavLink href="/">Customer Service</NavLink>
              <NavLink href="/">Gift Cards</NavLink>
              <NavLink href="/">Sell</NavLink>
              <NavLink href="/">Registry</NavLink>
              <NavLink href="/">Affiliate Program</NavLink>
            </div>

            {scrollComplete ? null : (
              <div className="absolute top-0 right-0 w-8 h-full bg-white/40 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={handleScrollRight}
                  className="z-10 flex items-center justify-center rounded-l-sm w-full text-sm h-full hover:bg-slate-100"
                >
                  <i className="fi fi-rr-angle-small-right" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubNav

const NavLink = ({ href = '/', children }: any) => {
  return (
    <Link
      href={href}
      className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap"
    >
      {children}
    </Link>
  )
}
