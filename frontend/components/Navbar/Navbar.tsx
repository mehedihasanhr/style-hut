import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Badge } from '../Badge'
import { MenuBar } from './MenuBar'
import { NavItem } from './NavItem'
import SearchBox from './SearchBox'
import SubNav from './SubNav'
import { TopNavbar } from './TopNav'

const Navbar = () => {
  const [sticky, setSticky] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`w-full h-fit border-b border-slate-200 ${
        sticky ? 'sticky top-0 left-0 z-50 drop-shadow-sm' : ''
      }`}
    >
      {/* main nav bar */}
      <div
        className={`${sticky ? 'bg-white/95 backdrop-blur-md' : 'bg-white'}`}
      >
        <nav
          className={`container flex items-center justify-between border-b border-dashed border-slate-2  ${
            sticky ? 'h-16' : 'h-16 md:h-24'
          }`}
        >
          <div className="flex items-center space-x-2">
            <button
              aria-labelledby="menuButton"
              onClick={() => setOpen(true)}
              className="flex md:hidden text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <Link href="/">
              <div className="relative w-28 h-10 sm:w-36 sm:h-14">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  fill
                  sizes="
              (max-width: 1550px) 150px,
              "
                  priority
                />
              </div>
            </Link>
          </div>
          {/* search box */}
          <SearchBox HOCClassName="hidden md:inline-block mx-5" />

          <div className="flex items-center space-x-5">
            {/* search button */}
            <Link
              href="/"
              className="flex md:hidden text-slate-700 space-x-2 group select-none"
            >
              <div className="flex items-center justify-center">
                <span className="text-xl sm:text-2xl mt-1 group-hover:text-blue-500">
                  <i className="i fi-rr-search" />
                </span>
              </div>
            </Link>

            {/* contact button */}
            <Link
              href="/"
              className="hidden md:flex text-slate-700 space-x-2 group select-none border-0 lg:border-r border-slate-200 lg:pr-3"
            >
              <div className="flex items-center justify-center">
                <span className="text-xl sm:text-2xl mt-1 group-hover:text-blue-500">
                  <i className="i fi-rr-headset" />
                </span>
              </div>
              <div className="hidden xl:inline-block">
                <span className="block text-gray-500 text-xs">Contact</span>
                <span className="whitespace-nowrap text-base text-slate-600 font-medium block -mt-1 group-hover:text-blue-500">
                  123-456-7890
                </span>
              </div>
            </Link>

            <Link
              href="/"
              className="flex text-slate-700 space-x-2 group select-none"
            >
              <div className="flex items-center justify-center">
                <span className="text-xl sm:text-2xl mt-1 group-hover:text-blue-500">
                  <i className="fi fi-rr-user" />
                </span>
              </div>
              <div className="hidden xl:inline-block">
                <span className="block text-gray-500 text-xs">Sign In</span>
                <span className="whitespace-nowrap text-base text-slate-600 font-medium block -mt-1 group-hover:text-blue-500">
                  Account
                </span>
              </div>
            </Link>

            {/* favorite */}
            <Link
              href="/"
              className="flex text-slate-700 space-x-2 group select-none"
            >
              <div className="flex items-center justify-center mt-1">
                <Badge badge="3">
                  <span className="text-xl sm:text-2xl group-hover:text-blue-500">
                    <i className="fi fi-rr-heart" />
                  </span>
                </Badge>
              </div>
            </Link>

            <Link
              href="/carts"
              className="flex text-slate-700 space-x-2 group select-none"
            >
              <div className="flex items-center justify-center mt-1">
                <Badge badge="5">
                  <span className="text-xl sm:text-2xl mt-1 group-hover:text-blue-500">
                    <i className="fi fi-rr-shopping-cart" />
                  </span>
                </Badge>
              </div>
              <div className="hidden sm:inline-block">
                <span className="block text-gray-500 text-[10px] sm:text-xs">
                  Total
                </span>
                <span className="whitespace-nowrap text-sm sm:text-base text-slate-600 font-medium block -mt-1 group-hover:text-blue-500">
                  $ 300.00
                </span>
              </div>
            </Link>
          </div>
        </nav>
        <SubNav />
      </div>
      <MenuBar open={open} close={() => setOpen(false)} />
      {/* sub nav */}
    </header>
  )
}

export default Navbar
