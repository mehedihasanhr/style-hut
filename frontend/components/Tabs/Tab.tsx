type TabProps = {
  children: React.ReactNode | React.ReactNode[]
  isActive: boolean
  onTabClick: () => void
}

export const Tab = ({ children, isActive, onTabClick, ...props }: TabProps) => {
  return (
    <button
      aria-labelledby="tabButton"
      tabIndex={-1}
      onClick={onTabClick}
      className={`text-sm md:text-base text-gray-800 bg-white py-2 px-4 border-b border-b-gray-200 -mb-[1px] border-t-2  border-transparent rounded-t-md inline-flex items-center ${
        isActive
          ? 'border-t-2 border-gray-300 border-b border-b-[#fff] border-x-[1px] border-x-gray-200'
          : ''
      }`}
      {...props}
    >
      <span className="mr-2">{children}</span>
    </button>
  )
}
