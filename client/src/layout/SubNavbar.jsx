import { Link } from 'react-router-dom'
import Dropdown from '../components/Dropdown'
import MegaMenu from '../components/MegaMenu'
import Select from '../components/Select'

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

const SubNavbar = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between gap-3 py-1.5 relative">
        <Dropdown className="">
          <Dropdown.Toggle className="text-slate-700 text-sm hover:cursor-pointer">All Categories</Dropdown.Toggle>
          <Dropdown.Menu className="">
            <MegaMenu />
          </Dropdown.Menu>
        </Dropdown>
        {subNavItems.map(({ name, path }) => (
          <Link to={path} key={Math.random()} className="text-sm text-slate-700 hover:text-gray-700">
            {name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SubNavbar
