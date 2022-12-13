import Accordion from '../Accordion'
import { allCategory } from '../../constants/categorys'

export const MenuBar = ({
  open,
  close,
}: {
  open: boolean
  close: () => void
}) => {
  return (
    <div
      className={`fixed top-0 w-full drop-shadow-lg h-screen bg-transparent z-[100] transition-all ease-in-out duration-300 ${
        open ? 'left-0' : '-left-full'
      }`}
    >
      <div className="max-w-[250px] h-full bg-white p-3 overflow-auto">
        <div className="mb-3">
          <div className="flex items-center justify-between px-4 py-2 text-sm font-medium text-blue-50 bg-blue-500 rounded-md">
            <span>Categories</span>
            <button
              aria-labelledby="close-menu"
              type="button"
              className="flex items-center justify-center w-8 h-8 text-xs text-blue-50 rounded-full hover:text-blue-50 active:bg-inherit focus:outline-none focus:bg-inherit"
              onClick={close}
            >
              <i className="fi fi-rr-cross" />
            </button>
          </div>
        </div>
        <div>
          {allCategory.map((category, index) => (
            <Accordion key={index}>
              <Accordion.Toggle>
                <div className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50">
                  <span>{category.header}</span>
                  <span className="flex items-center justify-center w-8 h-8 text-gray-400 rounded-full hover:text-gray-500">
                    <i className="fi fi-rr-angle-small-down" />
                  </span>
                </div>
              </Accordion.Toggle>
              <Accordion.Body>
                <div className="px-4 py-2 text-sm text-gray-700 bg-white rounded-md">
                  {category.links.map((subCategory, index) => (
                    <div key={index} className="py-1">
                      <a
                        href="#"
                        className="block text-gray-500 hover:text-gray-900"
                      >
                        {subCategory.label}
                      </a>
                    </div>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  )
}
