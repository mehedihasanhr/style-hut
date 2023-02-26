import { Logo } from '../components/Logo'
import { NavItem } from '../components/Nav/NavItem'
import MainSearchBar from '../components/Search/MainSearchBar'

export default function Navbar() {
  return (
    <header className="flex items-center">
      <div className="container">
        <div className="flex items-center justify-between h-20 border-b">
          <Logo className="w-36 h-auto" />

          {/* Search */}
          <MainSearchBar />

          {/* Navigation */}
          <ul className="list-none flex items-center space-x-4">
            <NavItem
              href="/"
              title="123-456-7890"
              subTitle="Contact"
              icon="fi fi-rr-headset"
              className="border-r border-gray-100 px-4"
            />
            <NavItem href="/" title="Account" subTitle="Sign In" icon="fi fi-rr-user" />
            <NavItem href="/" title="$300.00" subTitle="Total" icon="fi fi-rr-shopping-cart" badge={5} />
          </ul>
        </div>
      </div>
    </header>
  )
}
