import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SelectionInput } from '../Form'
import Quantity from '../Quantity'

const SelectionIcon = () => {
  return (
    <span
      className={`-mb-1 flex text-sm flex-col justify-center items-center text-zinc-300`}
    >
      <i className="fi fi-sr-caret-up -mb-1.5" />
      <i className="fi fi-sr-caret-down -mt-1.5" />
    </span>
  )
}

const Cart = () => {
  const [quantity, setQuantity] = React.useState(1)
  return (
    <div className="flex gap-8 py-5 border-b border-dashed mb-2">
      <div className="py-1.5 px-2 relative bg-slate-100 flex items-center justify-center">
        <div className="relative w-16 h-16">
          <Image
            src="/cloths/sweater-1.png"
            alt="sweater"
            fill
            sizes=" (max-width: 1550px) 40px, 60px"
          />
        </div>
      </div>

      {/* name */}
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Link href="/products/3" className="block mb-1 text-base font-medium">
            {"Shirt 1 men's fetions"}
          </Link>
          <div className="text-base font-medium">
            <span className="block">$180</span>
            <span className="text-[10px] text-gray-500 -mt-2 block">
              Dis: 30%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-3">
          <div className="flex items-center">
            <span className="pr-2 border-r border-slate-300">$200</span>
            <span className="text-green-700 pl-2">In Stock</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SelectionInput
              renderIcon={SelectionIcon}
              options={[
                { title: 'XL', val: 'XL' },
                { title: 'L', val: 'L' },
              ]}
              value="XL"
              placeholder="XL"
              className="w-20 bg-transparent border py-1 text-sm placeholder:text-gray-500"
              optActiveClass=""
              optClass="text-sm px-0 py-1 hover:bg-zinc-100"
              onSelect={(val) => console.log(val)}
            />

            {/* color */}
            <SelectionInput
              renderIcon={SelectionIcon}
              options={[
                { title: 'Blue', val: 'blue' },
                { title: 'Red', val: 'red' },
                { title: 'Yellow', val: 'yellow' },
              ]}
              value="blue"
              placeholder="Blue"
              className="w-20 bg-transparent border py-1 text-sm placeholder:text-gray-500"
              optActiveClass=""
              optClass="text-sm px-0 py-1 hover:bg-zinc-100"
              onSelect={(val) => console.log(val)}
            />

            {/* Quantity */}
            <div className="flex items-center justify-center w-full max-w-[120px]">
              <Quantity
                qnt={quantity}
                setQnt={(val) => setQuantity(val)}
                displayClassName="text-sm text-gray-700 font-medium block py-1 border-none w-10 px-0 outline-none focus:outline-none focus:border-none mr-[1px]"
                controllerClassName="py-1 rounded-md w-8 bg-[#f5f6f7]"
                className="border-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center text-zinc-600 text-sm space-x-2"
            >
              <i className="fi fi-rr-heart -mb-1" />
              <span className="">Save</span>
            </Link>
            <Link
              href="/"
              className="flex items-center text-zinc-600 text-sm space-x-2"
            >
              <i className="fi fi-rr-trash -mb-1" />
              <span className="">Delete</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

// const Cart = () => {
//   const [quantity, setQuantity] = React.useState(1)
//   const [checked, setChecked] = React.useState(false)

//   return (
//     <div className="py-3 mb-2">
//       <div className="flex items-center space-x-10">
//         {/* image */}
//         <div className="flex flex-col items-start">
//           <div className="w-12 h-12 flex items-center justify-center">
//             <div className="relative w-10 h-10">
//               <Image
//                 src="/cloths/sweater-1.png"
//                 alt="sweater"
//                 fill
//                 sizes="
//                 (max-width: 1550px) 40px,
//                 60px
//               "
//               />
//             </div>
//           </div>
//         </div>

//         {/* name */}
//         <div className="w-full max-w-[350px]">
//           <Link
//             href="/products/3"
//             className="text-sm text-gray-700 block line-clamp-2 hover:text-blue-700"
//           >
//             {
//               "Shirt 1 men's fetions Shirt 1 men's fetions Shirt 1 men's fetions Shirt 1 men's fetions"
//             }
//           </Link>
//         </div>

//         {/* Quantity */}
//         <div className="flex items-center justify-center w-full max-w-[120px]">
//           <Quantity
//             qnt={quantity}
//             setQnt={(val) => setQuantity(val)}
//             displayClassName="text-sm text-gray-700 font-medium block py-1 border-none w-10 px-0 outline-none focus:outline-none focus:border-none mr-[1px]"
//             controllerClassName="py-1 rounded-md w-8 bg-[#f5f6f7]"
//             className="border-none"
//           />
//         </div>

//         {/* price */}
//         <div className="flex items-center justify-center w-full max-w-[80px]">
//           <span className="text-sm text-gray-700 block">$ 100</span>
//         </div>

//         {/* Discount */}
//         <div className="flex items-center justify-center w-full max-w-[80px]">
//           <span className="text-sm text-gray-700 block">20%</span>
//         </div>

//         {/* Total */}
//         <div className="flex items-center justify-center w-full max-w-[80px]">
//           <span className="text-base text-gray-700 font-medium block">
//             $ 80
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Cart
