import { Link } from 'react-router-dom'

const Logo = ({ className = '', src = '/logo.svg' }) => {
  return (
    <Link to="/" className={`block ${className}`}>
      <div className={`w-40 overflow-hidden ${className}`}>
        <img src={src} alt="StyleHut" width="100%" height="100%" className="object-fit" />
      </div>
    </Link>
  )
}

export default Logo
