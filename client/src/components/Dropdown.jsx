import React, { useState, useEffect, useContext, createContext, useCallback } from 'react'
import { usePopper } from 'react-popper'

// dropdown context
const DropdownContext = createContext()

// toggle

const DropdownToggle = ({ children, icon = true, className = '', hover = false, iconClass = '', ...props }) => {
  const { toggle, setOpen, setRefEl } = useContext(DropdownContext)

  // handle on hover
  const handleHover = () => {
    if (!hover) return
    setOpen(true)
  }

  return (
    <div
      ref={setRefEl}
      className={`flex items-center flex-nowrap justify-between gap-3 whitespace-nowrap select-none ${className}`}
      onClick={toggle}
      onMouseOver={handleHover}
      {...props}
    >
      {children}
      {icon && <i className={`fi fi-rr-angle-down text-[10px] block -mb-1 ${iconClass}`} />}
    </div>
  )
}

// dropdown menu
const DropdownMenu = ({ className = '', children, placement = 'bottom-start', offset = [0, 8], ...props }) => {
  const { open, setOpen, popperEl, setPopperEl, refEl } = useContext(DropdownContext)

  const { styles, attributes } = usePopper(refEl, popperEl, {
    placement,
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'bottom', 'right', 'left'],
        },
      },
      {
        name: 'offset',
        options: { offset },
      },
    ],
  })

  const handleOutsideClick = useCallback(
    (e) => {
      if (open && !popperEl.contains(e.target) && !refEl.contains(e.target)) {
        setOpen(false)
        document.removeEventListener('mousedown', handleOutsideClick)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [popperEl, refEl, open],
  )

  // click outside
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <div
      ref={setPopperEl}
      style={styles.popper}
      onClick={() => setOpen(false)}
      className={`min-w-full z-[999] ${className} ${!open ? 'invisible pointer-events-none' : ''}`}
      {...attributes.popper}
      {...props}
    >
      {open && children}
    </div>
  )
}
// dropdown
const Dropdown = ({ children, isOpen, className = 'relative' }) => {
  const [open, setOpen] = useState(false)
  const [popperEl, setPopperEl] = useState(null)
  const [refEl, setRefEl] = useState(null)

  // toggle
  const toggle = () => (isOpen !== undefined ? null : setOpen(!open))

  // open on hover
  useEffect(() => {
    isOpen !== undefined && setOpen(isOpen)
  }, [isOpen])

  return (
    <div className={className}>
      <DropdownContext.Provider value={{ open, setOpen, popperEl, setPopperEl, refEl, setRefEl, toggle }}>
        {children}
      </DropdownContext.Provider>
    </div>
  )
}

Dropdown.Menu = DropdownMenu
Dropdown.Toggle = DropdownToggle

export default Dropdown
