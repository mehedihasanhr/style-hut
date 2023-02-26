import * as React from 'react'
import { usePopper } from 'react-popper'

const DropdownCtx = React.createContext()

// * Dropdown Toggle
function DropdownToggle({ children, className, ...props }) {
  const { toggleOpen, setReferenceElement } = React.useContext(DropdownCtx)

  return (
    <button ref={setReferenceElement} className={className} onClick={toggleOpen} {...props}>
      {children}
    </button>
  )
}

// * Dropdown Menu
function DropdownMenu({ children, className, placement = 'bottom-start', ...props }) {
  const [arrowElement, setArrowElement] = React.useState(null)
  const { open, setOpen, toggleOpen, referenceElement, popperElement, setPopperElement } = React.useContext(DropdownCtx)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'bottom', 'right', 'left'],
        },
      },
      {
        name: 'arrow',
        options: {
          element: arrowElement,
          padding: 5,
        },
      },
    ],
  })

  const handleClickOutside = React.useCallback(
    e => {
      if (popperElement && referenceElement && !popperElement.contains(e.target) && !referenceElement.contains(e.target)) {
        setOpen(false)
      }
    }, [popperElement, referenceElement, setOpen]
  )


  // * handle click outside
  React.useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popperElement, toggleOpen, open])

  return (
    <div
      ref={setPopperElement}
      className={`${className} z-[100] empty:invisible empty:pointer-events-none`}
      onMouseUp={() =>setOpen(false)}
      style={styles.popper}
      {...attributes.popper}
      {...props}
    >
      <div ref={setArrowElement} style={styles.arrow} />
      {open && <>{children}</>}
    </div>
  )
}

// * Dropdown
function Dropdown({ children, className, ...props }) {
  const [open, setOpen] = React.useState(false)
  const [referenceElement, setReferenceElement] = React.useState(null)
  const [popperElement, setPopperElement] = React.useState(null)

  const toggleOpen = () => setOpen(!open)

  return (
    <DropdownCtx.Provider
      value={{
        open,
        setOpen,
        toggleOpen,
        referenceElement,
        popperElement,
        setReferenceElement,
        setPopperElement,
      }}
    >
      <div className={`relative ${className}`} {...props}>
        {children}
      </div>
    </DropdownCtx.Provider>
  )
}

Dropdown.Toggle = DropdownToggle
Dropdown.Menu = DropdownMenu

export default Dropdown
