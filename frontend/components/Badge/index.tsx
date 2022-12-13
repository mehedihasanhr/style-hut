import React from 'react'

export const Badge = ({ children, badge }: any) => {
  return (
    <div className="relative w-fit h-fit">
      <span className="absolute -top-1/2 -right-1/2 p-1 rounded-full text-[10px] origin-center font-medium text-white bg-red-500 w-4 h-4 flex items-center justify-center translate-y-1/2 -translate-x-1/2">
        {badge}
      </span>
      <React.Fragment>{children}</React.Fragment>
    </div>
  )
}
