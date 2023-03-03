import Navigation from './Navigation'
import SubNavbar from './SubNavbar'
import TopSubNavigation from './TopSubNavigation'

const Layout = ({ children }) => {
  return (
    <>
      <header className="border-b border-gray-300">
        <TopSubNavigation />
        <Navigation />
        <SubNavbar />
      </header>
      <main className="container">{children}</main>
    </>
  )
}

export default Layout
