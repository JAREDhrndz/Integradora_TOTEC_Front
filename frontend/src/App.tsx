// frontend/src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './Screens/LandingPage'
import Login from './Screens/Login'
import Menu from './Screens/Menu'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu/*" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App