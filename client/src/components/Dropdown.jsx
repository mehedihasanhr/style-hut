import React, { useState, useEffect, useContext, createContext, useCallback} from 'react';
import { usePopper } from 'react-popper';

// dropdown context 
const DropdownContex = createContext();


// toggle 

const DropdownToggle = ({
  children, 
  icon = true, 
  className="", 
  hover=false, 
  iconClass="", 
  ...props
}) => {
  const { toggle, open, setOpen, setRefEl } = useContext(DropdownContex); 
  
  // handle on hover 
  const handleHover = () => {
    if(!hover) return;
    setOpen(true);
  }

  return(
    <div 
      ref={setRefEl}
      className={`flex items-center select-none justify-between gap-3 ${className}`}
      onClick={toggle}
      onMouseOver={handleHover}
      {...props}
    >
      {children}
      { icon && <i className={`fi fi-rr-angle-down text-[10px] ${iconClass}`} /> }
    </div>
  )


}

// dropdown manu
const DropdownMenu = ({className="", children, placement="bottom-start", offset=[0, 8],  ...props}) => {
  const { open, setOpen, popperEl, setPopperEl, refEl } = useContext(DropdownContex);

  const { styles, attributes } = usePopper(refEl, popperEl, {
    placement,
    modifiers: [
      {
        name: "flip",
        options: {
          fallbackPlacements: ['top', 'bottom', 'right', 'left'],
        },
      },
      {
        name: "offset",
        options: { offset }
      }
    ]
  })


  const handleOutsideClick = useCallback((e) => {
    if(open && !popperEl.contains(e.target) && !refEl.contains(e.target)){
      setOpen(false);
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [popperEl, refEl, open])

  // click outsite
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
  }, [open]);

  return (
    <div 
      ref={setPopperEl} 
      style={styles.popper} 
      className={`min-w-full ${className} ${!open ? 'invisible pointer-events-none' : ''}`}
      {...attributes.popper}
      {...props}
    >
      {open && children}
    </div>
  )

}
// dropdown
const Dropdown = ({children, isOpen}) => {
  const [ open, setOpen ] = useState(false);
  const [ popperEl, setPopperEl ] = useState(null);
  const [ refEl, setRefEl ] = useState(null);

  // toggle 
  const toggle = () => setOpen(!open);

  return (
    <div className="relative">
      <DropdownContex.Provider 
        value={{open, setOpen, popperEl, setPopperEl, refEl, setRefEl, toggle}}
      >
        {children}
      </DropdownContex.Provider>
    </div>
  )
}


Dropdown.Menu = DropdownMenu;
Dropdown.Toggle = DropdownToggle;

export default Dropdown;
