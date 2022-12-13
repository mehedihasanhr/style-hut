import Link from 'next/link'
type TProps = {
  title: string
  href: string
  className?: string
  liClassName?: string
}

export const NavItem = ({ title, href, className, liClassName }: TProps) => {
  return (
    <li className={`${liClassName}`}>
      <Link href="/" className={` ${className}`}>
        {title}
      </Link>
    </li>
  )
}
