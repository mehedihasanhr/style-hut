import './icons/uicons-regular-rounded/css/uicons-regular-rounded.css'
import './icons/uicons-solid-straight/css/uicons-solid-straight.css'
import './icons/uicons-solid-rounded/css/uicons-solid-rounded.css'
import './icons/uicons-bold-straight/css/uicons-bold-straight.css'
import './icons/uicons-bold-rounded/css/uicons-bold-rounded.css'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
