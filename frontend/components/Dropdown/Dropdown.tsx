import * as React from 'react'
import { usePopper } from 'react-popper'
import { Menu } from './Menu'
import { Toggle } from './Toggle'
import { dropdownModifiers } from '../../utils/popper'

import { dropdownVarients } from '../../utils/motion'

interface DropdownProps {
  children: React.ReactNode[]
  hoverable?: boolean
}

const Dropdown = ({ children, hoverable = true }: DropdownProps) => {
  const [refElement, setRefElement] = React.useState<any>(null)
  const [popperElement, setPopperElement] = React.useState<any>(null)
  const [show, setShow] = React.useState(false)

  const wrapRef = React.useRef<HTMLDivElement>(null)

  const { styles, attributes } = usePopper(refElement, popperElement, {
    modifiers: dropdownModifiers.modifiers,
  })

  const childs = React.Children.toArray(children)

  // handle hoverable dropdown
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverable) {
      setShow(true)
    }
  }

  // handle click to show dropdown
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setShow(!show)
  }

  // if hoverable, hide dropdown when mouse leave

  React.useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.addEventListener('mouseleave', (e) => {
        setShow(false)
      })
    }
  })

  return (
    <div ref={wrapRef}>
      <div
        onClick={handleClick}
        onMouseOver={handleMouseEnter}
        ref={setRefElement}
        className="select-none"
      >
        {childs[0]}
      </div>
      <div
        ref={setPopperElement}
        style={styles.popper}
        className={`min-w-full z-[9999] ${
          show ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        {...attributes}
      >
        {childs[1]}
      </div>
    </div>
  )
}

Dropdown.Menu = Menu
Dropdown.Toggle = Toggle

export default Dropdown
