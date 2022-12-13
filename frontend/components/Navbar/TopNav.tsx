import Link from 'next/link'
import * as React from 'react'
import Dropdown from '../Dropdown'
import { SelectionInput } from '../Form'

export const TopNavbar = () => {
  const [currency, setCurrency] = React.useState('usd')
  const [language, setLanguage] = React.useState('english')

  return (
    <div className="h-8 bg-blue-500 hidden md:block">
      <div className="container flex items-center justify-between h-full">
        <p className="text-xs text-slate-100">Welcome to our store!</p>
        <ul className="flex items-center space-x-3">
          <li className="pr-3 border-r border-slate-300 mr-3">
            <div className="w-14">
              <SelectionInput
                value={currency}
                placeholder="USD"
                iconClass="text-xs text-slate-300"
                className="py-0.5 px-2 text-xs text-slate-100 placeholder:text-xs bg-transparent placeholder:text-slate-100 outline-none focus:ring-0"
                onSelect={(val) => setCurrency(val as string)}
                optActiveClass="text-blue-600"
                options={[
                  { title: 'USD', val: 'USD' },
                  { title: 'TK', val: 'TK' },
                ]}
                optClass="text-xs py-0.5 px-0.5 mb-0.5 hover:text-blue-500"
              />
            </div>
          </li>

          <Item href="/">Blog</Item>

          <Item href="/">Contact Us</Item>

          <Item href="/">account</Item>

          <Item href="/">
            <i className="fi fi-rr-user"></i>
            <span>Sign In / Register</span>
          </Item>
        </ul>
      </div>
    </div>
  )
}

// item
const Item = ({ href = '/', children, className = '' }: any) => {
  return (
    <>
      <li>
        <Link
          href={href}
          className={`flex items-center space-x-1 text-xs text-slate-100 hover:underline ${className}`}
        >
          {children}
        </Link>
      </li>
    </>
  )
}
