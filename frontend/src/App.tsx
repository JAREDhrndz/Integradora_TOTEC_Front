import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './Screens/LandingPage'
import Login from './Screens/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App