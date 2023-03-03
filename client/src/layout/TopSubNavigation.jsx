import { useState } from 'react'
import Select from '../components/Select'
import NavItem from '../components/NavItem'

const TopSubNavigation = () => {
  const [lang, setLang] = useState('USD')
  return (
    <div className="bg-blue-500 hidden md:block">
      <div className="container h-6 lg:h-8 flex items-center justify-between text-white text-[13px]">
        <p>Welcome to our store!</p>
        <div className="flex items-center space-x-3">
          <div className="pr-3 border-r border-blue-300">
            <Select value={lang} onSelect={setLang} className="text-[13px]" iconClass="text-[10px]">
              <Select.Option value="USD" title="USD" className="text-[13px]" />
              <Select.Option value="CUR" title="CUR" className="text-[13px]" />
              <Select.Option value="BDT" title="BDT" className="text-[13px]" />
            </Select>
          </div>
          <ul className="flex items-center space-x-4">
            <NavItem href="/" title="Blog" className="hover:underline" />
            <NavItem href="/" title="Contact Us" className="hover:underline" />
            <NavItem href="/" title="Account" className="hover:underline" />
            <NavItem href="/" title="Sign In/Register" className="hover:underline" />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TopSubNavigation
