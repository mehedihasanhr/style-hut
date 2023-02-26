import { Link } from 'react-router-dom'

// nav item component
export const NavItem = ({ children, title, className, icon, subTitle, badge, href = '/', ...props }) => {
  return (
    <li className={`${className} text-sm font-medium`} {...props}>
      <Link
        to={href}
        className="text-gray-700 hover:text-gray-900 py-1 px-2 flex items-center space-x-2 group relative"
      >
        <div className="relative">
          {badge > 0 && (
            <span className="absolute -top-1/2 -right-1/2 p-1 rounded-full text-[10px] font-semibold origin-center text-white bg-red-500 w-4 h-4 flex items-center justify-center translate-y-1/2 -translate-x-1/2">
              {badge}
            </span>
          )}
          <i className={`${icon} text-2xl block -mb-1.5 group-hover:text-blue-500`} />
        </div>
        <div className="flex flex-col h-fit">
          <span className="block text-[11px] text-gray-500">{subTitle}</span>
          <span className="block text-md -mt-0.5 group-hover:text-blue-500">{title}</span>
        </div>
      </Link>
    </li>
  )
}
