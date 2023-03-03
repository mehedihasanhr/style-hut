import { useState } from 'react'
import Logo from '../components/Logo'
import MainSearch from '../components/MainSearch'
import NavItem from '../components/NavItem'

// all categories
const categories = [
  { title: 'All Categories', value: 'All Categories' },
  { title: 'Electronics', value: 'Electronics' },
  { title: 'Fashion', value: 'Fashion' },
  { title: 'Home & Garden', value: 'Home & Garden' },
  { title: 'Sports & Outdoors', value: 'Sports & Outdoors' },
  { title: 'Toys & Games', value: 'Toys & Games' },
  { title: 'Health & Beauty', value: 'Health & Beauty' },
  { title: 'Automotive', value: 'Automotive' },
  { title: 'Grocery', value: 'Grocery' },
  { title: 'Baby & Kids', value: 'Baby & Kids' },
  { title: 'Books', value: 'Books' },
  { title: 'Movies & Music', value: 'Movies & Music' },
  { title: 'Pets', value: 'Pets' },
  { title: 'Travel', value: 'Travel' },
  { title: 'Other', value: 'Other' },
]

// Navigation Item
const NavigationItem = ({ href = '/', icon = '', badge = 0, subTitle, title, className = '', textClassName = '' }) => {
  return (
    <NavItem href={href} className={`flex items-center gap-2 group ${className}`}>
      <div className="block relative">
        <i className={`text-2xl lg:text-3xl block -mb-1 text-gray-700 group-hover:text-blue-500 ${icon}`} />
        {badge > 0 && (
          <span className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 w-[18px] h-[18px] rounded-full text-xs bg-red-500 flex items-center justify-center text-white font-semibold">
            {badge}
          </span>
        )}
      </div>
      <div className={`flex flex-col items-start ${textClassName}`}>
        <span className="text-xs leading-[10px] text-[#373B41]">{subTitle}</span>
        <span className="block font-semibold text-black/80 group-hover:text-blue-500">{title}</span>
      </div>
    </NavItem>
  )
}

// Navbar
const Navigation = () => {
  const [category, setCategory] = useState('All Categories')
  const [search, setSearch] = useState('')

  return (
    <div className="container border-b border-dash h-16 lg:h-20 flex items-center justify-between gap-3">
      <button
        aria-describedby="menutoggle"
        className="flex items-center justify-center lg:hidden order-last sm:ml-6 md:order-first md:ml-0"
      >
        <i className="fi fi-rr-menu-burger text-lg md:text-xl text-gray-700" />
      </button>
      {/* main logo */}
      <Logo className="hidden sm:block w-28 md:w-36 lg:w-40" />
      {/* small logo */}
      <div>
        <div className="sm:hidden font-bold text-xl w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
          SH
        </div>
      </div>
      <MainSearch
        categories={categories}
        category={category}
        onSelect={setCategory}
        search={search}
        setSearch={setSearch}
      />
      <ul className="hidden md:flex items-center gap-5">
        <NavigationItem
          className="pr-5 border-r hidden xl:flex"
          icon="fi fi-rr-headset"
          title="123-456-7890"
          subTitle="Contact"
        />
        <NavigationItem icon="fi fi-rr-user" title="Account" subTitle="Sign In" textClassName="hidden xl:flex" />
        <NavigationItem icon="fi fi-rr-heart" title="$200.00" subTitle="total" badge={5} textClassName="hidden" />
        <NavigationItem
          icon="fi fi-rr-shopping-cart"
          title="$200.00"
          subTitle="total"
          badge={5}
          textClassName="ml-1 hidden xl:flex"
        />
      </ul>
    </div>
  )
}

export default Navigation
