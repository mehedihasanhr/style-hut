import React from 'react'

export const Menu = ({
  children,
  className = '',
}: {
  children: React.ReactElement
  className?: string
}) => {
  return <div className={className}>{children}</div>
}
