const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-6xl font-bold text-center text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-center text-gray-500">Page not found</h2>
        <p className="text-lg text-center text-gray-500">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <a
          href="/"
          className="px-4 py-2 mt-4 text-sm font-medium text-white transition duration-200 ease-in bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Go to homepage
        </a>
      </div>
    </div>
  )
}

export default NotFoundPage
