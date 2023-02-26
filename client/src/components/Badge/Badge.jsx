export default function Badge({ children, color, className }) {
  return (
    <div className="relative w-fit h-fit">
      <span className="absolute top-0 right-0 origin-top-right">23</span>
      {children}
    </div>
  )
}
