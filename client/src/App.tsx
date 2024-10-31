import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminLogin from "./components/AdminLogin"
import AdminHome from "./components/AdminHome"
import { Toaster } from "react-hot-toast"
import UserLogin from "./components/UserLogin"
import UserHome from "./components/UserHome"
import UserRegister from "./components/UserRegister"
import UserProfile from "./components/UserProfile"

const App = () => {
  return (
    <BrowserRouter>
      <Toaster/>
      <Routes>
        <Route path="/" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserRegister/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/home" element={<UserHome/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/home" element={<AdminHome/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
