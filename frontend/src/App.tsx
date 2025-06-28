import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './Screens/LandingPage'
import Login from './Screens/Login'
import Menu from './Screens/Menu'

//SIDEBAR URLS
import Users from './Components/SideMenuComponents/Users'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu/*" element={<Menu />} />
        <Route path="/menu/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App