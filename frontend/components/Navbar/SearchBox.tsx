import React from 'react'
import { Input, SelectionInput } from '../Form'
import { searchOptions } from './searchOptions'
import { usePopper } from 'react-popper'
import clickOutside from '../HOC/withClickOutsite'

const SearchBox = ({ outsiteClick }: any) => {
  const [refEl, setRefEl] = React.useState<any>(null)
  const [popperEl, setPopperEl] = React.useState<any>(null)
  const [show, setShow] = React.useState(false)

  const [searchText, setSearchText] = React.useState('')
  const [option, setOption] = React.useState(searchOptions[0].title as string)

  const { styles, attributes } = usePopper(refEl, popperEl, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: { offset: [0, 4] },
      },
    ],
  })

  React.useEffect(() => {
    if (outsiteClick) setShow(false)
  }, [outsiteClick])

  return (
    <div className="relative">
      <div className="flex w-full" ref={setRefEl}>
        <div className="w-full flex items-center border border-gray-200 border-r-0 rounded-l-sm">
          {/* category menu */}
          <div className="border-r border-gray-200 max-w-[200px] rounded-l-sm">
            <SelectionInput
              value={option}
              onSelect={(val) => setOption(val as string)}
              options={searchOptions}
              placeholder={searchOptions[0].title}
              optClass="text-sm hover:text-blue-500"
              iconClass="text-gray-400 text-sm mr-1.5 flex items-center justify-center"
              className="rounded-none text-sm bg-gray-50 border-none focus:ring-0 py-3 rounded-l-sm placeholder:text-gray-500"
            />
          </div>

          {/* search input */}
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for products, brands and more"
            onFocus={() => setShow(true)}
            className="rounded-none text-sm placeholder:text-sm bg-transparent focus:ring-0 py-3 w-full"
          />
        </div>

        <button
          aria-labelledby="searchButtton"
          className="px-5 bg-blue-500 hover:bg-blue-600 rounded-r-sm"
        >
          {/* serach icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* suggestion menu */}
      {!show ? null : (
        <div
          ref={setPopperEl}
          style={{ ...styles.popper }}
          {...attributes}
          className="min-w-full z-10"
        >
          <div className="h-full max-h-[400px] bg-white drop-shadow-lg rounded-md shadow-slate-200 z-50 w-full">
            <div className="p-2 max-h-[300px] overflow-hidden hover:overflow-y-auto scrollbar">
              <ul>
                <li className="flex items-center relative py-2 px-4 space-x-1 hover:bg-slate-50 select-none cursor-pointer">
                  <span className="text-gray-400 text-sm mr-1.5 flex items-center justify-center">
                    <i className="fi fi-rr-angle-small-down" />
                  </span>
                  <span>Search for {`"React"`}</span>
                </li>
                <li className="flex items-center relative py-2 px-4 space-x-1 hover:bg-slate-50 select-none cursor-pointer">
                  <span className="text-gray-400 text-sm mr-1.5 flex items-center justify-center">
                    <i className="fi fi-rr-angle-small-down" />
                  </span>
                  <span>Search for {`"React"`}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default clickOutside(SearchBox)
