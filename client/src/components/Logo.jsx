const Logo = ({ className = '', src = '/logo.svg' }) => {
  return (
    <div className={`w-40 overflow-hidden ${className}`}>
      <img src={src} alt="StyleHut" width="100%" height="100%" className="object-fit" />
    </div>
  )
}

export default Logo
