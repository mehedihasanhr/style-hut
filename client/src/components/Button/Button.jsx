export default function Button ({ children, variant = "primary", className,...props}) {

    const variantClasses = {
        primary: "bg-blue-500 text-white border border-blue-500 hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-300",
        secondary: "bg-gray-500 text-white border border-gray-500 hover:bg-gray-600 focus:ring-gray-500 disabled:bg-gray-300",
        danger: "bg-red-500 text-white border border-red-500 hover:bg-red-600 focus:ring-red-500 disabled:bg-red-300",
        info: "bg-Sky-500 text-white border border-Sky-500 hover:bg-Sky-600 focus:ring-Sky-500 disabled:bg-Sky-300", 
        success: "bg-green-500 text-white border border-green-500 hover:bg-green-600 focus:ring-green-500 disabled:bg-green-300",
    }

    return(
        <button className={`p-3 flex items-center justify-center space-x-3 ${variantClasses[variant]} ${className}`}>
           {children}
        </button>
    )
}