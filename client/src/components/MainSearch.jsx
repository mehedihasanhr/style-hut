import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'
import Select from './Select'

const MainSearch = ({ categories, category, onSelect, search, setSearch }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(search.length > 0)
  }, [search])

  return (
    <div className="w-full max-w-[350px] lg:max-w-[450px] 2xl:max-w-[524px]">
      <Dropdown isOpen={open} className="w-full">
        <Dropdown.Toggle icon={false} className="w-full">
          <div className="flex items-center w-full">
            <div className="hidden lg:block">
              <Select
                value={category}
                onSelect={onSelect}
                toggleClassName="w-36 bg-[#EDEDED] rounded-l-full text-sm py-3 px-3.5"
              >
                {categories.map(({ title, value }) => (
                  <Select.Option key={Math.random()} value={value} title={title} className="text-sm py-0.5" />
                ))}
              </Select>
            </div>
            {/* search box */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => setOpen(false)}
              placeholder="Search for products, brands and categories"
              className="w-full bg-[#F5F5F5] text-sm py-2.5 md:py-3 px-5 lg:px-3 outline-none placeholder:text-sm placeholder:text-slate-500 rounded-full lg:rounded-none"
            />

            {/* Button with icon  */}
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 lg:relative lg:top-auto lg:right-auto lg:translate-y-0 rounded-r-full text-sm lg:py-2.5 pl-3 lg:px-4 flex items-center justify-center bg-[#F5F5F5] lg:bg-blue-500 text-slate-500 lg:text-white">
              <i className="fi fi-rr-search text-lg md:text-xl block -mb-1" />
            </button>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-full">
          <div className="flex flex-col bg-white shadow-lg rounded-md overflow-hidden">
            <Link to="/" className="block py-1 px-3 hover:bg-zinc-100">
              Search for {search}
            </Link>
            <Link to="/" className="block py-1 px-3 hover:bg-zinc-100">
              Search for {search}
            </Link>
            <Link to="/" className="block py-1 px-3 hover:bg-zinc-100">
              Search for {search}
            </Link>
            <Link to="/" className="block py-1 px-3 hover:bg-zinc-100">
              Search for {search}
            </Link>
            <Link to="/" className="block py-1 px-3 hover:bg-zinc-100">
              Search for {search}
            </Link>
            <Link to="/" className="block py-1 px-3 hover:bg-zinc-100">
              Search for {search}
            </Link>
            <Link to="/" className="block py-1 px-3 hover:bg-zinc-100">
              Search for {search}
            </Link>
            <Link to="/" className="block py-1 px-3 hover:bg-zinc-100">
              Search for {search}
            </Link>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default MainSearch
