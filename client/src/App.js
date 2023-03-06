import './icons/uicons-regular-rounded/css/uicons-regular-rounded.css'
import './icons/uicons-solid-straight/css/uicons-solid-straight.css'
import './icons/uicons-solid-rounded/css/uicons-solid-rounded.css'
import './icons/uicons-bold-straight/css/uicons-bold-straight.css'
import './icons/uicons-bold-rounded/css/uicons-bold-rounded.css'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFoundPage from './pages/404'
import Categories from './pages/Categories'
import ProductDetails from './pages/ProductDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
