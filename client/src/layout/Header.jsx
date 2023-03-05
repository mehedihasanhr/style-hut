import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import SubNavbar from './SubNavbar'
import TopSubNavigation from './TopSubNavigation'

const Header = () => {
  const [sticky, setSticky] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // handle scroll event
  useEffect(() => {
    let prevScrollPosition = 0
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset
      // if scrolled position is 0 then set scrolled to false
      if (currentScrollPosition === 0) {
        setScrolled(false)
        setSticky(false)
      }
      // if scrolled up and not at top of page
      // then set scrolled to true
      if (currentScrollPosition < prevScrollPosition) {
        setSticky(true)
      } else {
        setSticky(false)
        setScrolled(true)
      }
      // set prevScrollPosition to currentScrollPosition
      prevScrollPosition = currentScrollPosition
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={` border-gray-300 ${
        scrolled
          ? sticky
            ? 'sticky top-0 left-0 z-[999] bg-white translate-y-0 transition-transform duration-300 shadow-md'
            : 'transform -translate-y-full'
          : 'border-b'
      }`}
    >
      {!scrolled && <TopSubNavigation />}
      <Navigation />
      <SubNavbar />
    </header>
  )
}

export default Header
