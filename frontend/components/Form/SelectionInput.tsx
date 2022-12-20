import * as React from 'react'
import Input from './Input'
import { usePopper } from 'react-popper'

interface TProps {
  optClass?: string
  options: { title: string; val: string }[]
  value: string
  optActiveClass?: string
  renderIcon?: () => React.ReactNode
  iconClass?: string
  onSelect: (val: string) => void
}

const SelectionInput = ({
  optClass = 'w-full',
  options,
  onSelect,
  value,
  iconClass,
  className,
  optActiveClass,
  renderIcon,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  TProps) => {
  const [selected, setSelected] = React.useState('')
  const [referenceElement, setReferenceElement] = React.useState<any>(null)
  const [popperElement, setPopperElement] = React.useState<any>(null)
  const [show, setShow] = React.useState(false)

  const wrapperRef = React.useRef<HTMLDivElement>(null) // wrapper ref

  // click outside
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  // popper config
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
    ],
  })

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="w-full relative select-none cursor-pointer">
        <Input
          {...props}
          ref={setReferenceElement}
          value={selected}
          readOnly
          className={`hover:cursor-pointer select-none ${className}`}
          onClick={() => {
            setShow(!show)
          }}
        />
        <span className="block absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
          {renderIcon ? (
            renderIcon()
          ) : (
            <span className={`-mb-1 ${iconClass}`}>
              <i className="fi fi-rr-angle-small-down" />
            </span>
          )}
        </span>
      </div>
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes}
        className={`w-full bg-white drop-shadow-lg rounded-md shadow-slate-200 z-50 ${
          show ? 'h-auto' : 'h-0 overflow-hidden'
        }`}
      >
        <div className="max-h-[300px] overflow-hidden hover:overflow-y-auto scrollbar">
          <ul>
            {options?.map((opt, index) => (
              <li
                key={index}
                className={`flex items-center relative py-2 px-4 space-x-1 hover:bg-slate-50 select-none cursor-pointer ${optClass} ${
                  opt.val === value ? optActiveClass : ''
                }`}
                onClick={() => {
                  onSelect(opt.val as string)
                  setSelected(opt.title)
                  setShow(false)
                }}
              >
                {opt.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SelectionInput
