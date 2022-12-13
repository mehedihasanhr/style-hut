import React from 'react'

interface IProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  [key: string]: any
}

export const Slide = ({ children, className = '', ...props }: IProps) => {
  return <div className={`relative ${className}`}>{children}</div>
}

export default Slide
