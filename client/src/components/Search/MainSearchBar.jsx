import * as React from 'react'
import { Dropdown } from '../Dropdown'

export default function MainSearchBar() {
  const [search, setSearch] = React.useState('')
  const [category, setCategory] = React.useState('All Categories')

  return (
    <div className="relative flex items-center border border-gray-300">
      <Dropdown>
        <Dropdown.Toggle className="flex items-center justify-between py-1 px-4 space-x-3 border-r">
          <span className="text-sm">{category}</span>
          <i className="fi fi-rr-angle-small-down -mb-1 text-xs" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="bg-white shadow-xl py-1 rounded-lg">
          <ul className="list-none flex flex-col">
            <li className="text-sm py-1 px-3 hover:bg-zinc-100 hover:cursor-pointer"> All Categories </li>
            <li className="text-sm py-1 px-3 hover:bg-zinc-100 hover:cursor-pointer"> Man's Fashions </li>
            <li className="text-sm py-1 px-3 hover:bg-zinc-100 hover:cursor-pointer"> Woman's Fashions </li>
          </ul>
        </Dropdown.Menu>
      </Dropdown>
      <div>
        <input
          type="text"
          className="py-1 px-4 w-full"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div></div>
    </div>
  )
}
