import { AccordionToggle } from './AccordionToggle'
import { AccordionBody } from './AccordionBody'
import React, { useEffect } from 'react'

type AccordionProps = {
  children: React.ReactNode[]
  className?: string
}

const Accordion = ({ children, className, ...props }: AccordionProps) => {
  const childrenArray = React.Children.toArray(children)
  const [isOpen, setIsOpen] = React.useState(false)
  const [height, setHeight] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (ref.current && isOpen) {
      setHeight(ref.current.scrollHeight)
    } else if (ref.current && !isOpen) {
      setHeight(0)
    }
  }, [isOpen])

  return (
    <div>
      <div onClick={handleClick} className="select-none">
        {childrenArray[0]}
      </div>
      <div
        ref={ref}
        className={`h-[${height}px] overflow-hidden transition-all duration-500 ease-linear`}
      >
        {childrenArray[1]}
      </div>
    </div>
  )
}

Accordion.Toggle = AccordionToggle
Accordion.Body = AccordionBody

export default Accordion
