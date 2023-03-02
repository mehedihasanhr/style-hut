import { Link } from 'react-router-dom';

const Nav = ({ children, title, className, href="/", ...props }) => {
  return(
    <li className="inline-block">
      <Link to={href} className={` ${className}`} {...props}>
        {children || title}
      </Link>
    </li>
  )  
}

export default Nav;
