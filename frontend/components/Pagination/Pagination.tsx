import React, { DetailedReactHTMLElement } from 'react'

type PaginationProps = {
  className?: string
  viewParPage?: number
  totalItems?: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

const Pagination = ({
  viewParPage = 15,
  totalItems = 100,
  currentPage = 1,
  onPageChange,
  className,
  ...props
}: PaginationProps) => {
  const [renderButtons, setRenderButtons] = React.useState<number[]>([])
  const totalPages = Math.ceil(totalItems / viewParPage)

  // render buttons
  React.useEffect(() => {
    const buttons: number[] = []

    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        buttons.push(i)
      }
    }

    if (currentPage > 3 && currentPage < totalPages - 3) {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        buttons.push(i)
      }
    }

    if (currentPage >= totalPages - 3) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        buttons.push(i)
      }
    }

    setRenderButtons(buttons)
  }, [currentPage, totalPages])

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <PreviousPage
          disabled={currentPage === 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
        />

        {
          // render dots
          renderButtons[0] > 1 && (
            <span className="w-6 h-6 flex items-center justify-center text-sm">
              ...
            </span>
          )
        }

        {renderButtons.map((item) => (
          <button
            key={item}
            onClick={() => onPageChange && onPageChange(item)}
            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md text-sm ${
              item === currentPage
                ? 'bg-blue-500 text-blue-50'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {item}
          </button>
        ))}

        {
          // render dots
          renderButtons[renderButtons.length - 1] < totalPages - 1 && (
            <span className="w-6 h-6 flex items-center justify-center text-sm">
              ...
            </span>
          )
        }
        <NextPage
          disabled={currentPage === totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  )
}

export default Pagination

const NextPage: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  return (
    <button
      aria-labelledby="paginationRightButton"
      className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 flex items-center justify-center rounded-md  hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100"
      {...props}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  )
}

const PreviousPage: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  return (
    <button
      aria-labelledby="paginationLeftButton"
      className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 flex items-center justify-center rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100"
      {...props}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  )
}
