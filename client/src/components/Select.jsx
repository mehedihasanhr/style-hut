import { createContext, useContext } from 'react';
import Dropdown from './Dropdown';


// context 
const SelectContext = createContext();

// Selection Option
const Option = ({value, title, children, className=""}) => {
  const { onSelect } = useContext(SelectContext);
  return(
    <div
      onClick={() => onSelect ? onSelect(value) : null}
      className={`select-none cursor-default hover:bg-zinc-100 px-3 ${className}`}
    >
       {children || title} 
    </div>
  )
}

const Select = ({
  value, 
  onSelect, 
  children, 
  icon ="true", 
  iconClass="", 
  className="", 
  ...props
}) => {
  return(
    <SelectContext.Provider value={{onSelect}}>
      <Dropdown>
        <Dropdown.Toggle icon={icon} iconClass={iconClass}>
         <span>{value}</span> 
        </Dropdown.Toggle>
        <Dropdown.Menu 
          offset={[0, 4]}
          className={`bg-white text-black/80 rounded-md py-2 shadow ${className}`}
        >
         {children} 
        </Dropdown.Menu>
      </Dropdown>
    </SelectContext.Provider>
  )
}

Select.Option = Option;
export default Select;
