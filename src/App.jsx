
import { Route,Routes } from 'react-router-dom'
import './App.css'
import { NavBar } from './Components/navbar/NavBar'
import "./index.css"
import Home from './pages/Home'
import SignIn from './Components/common/SignIn'
import { AuthContextProvider } from './context/AuthContext.jsx'
import Profile from './Components/user/Profile.jsx'
import Protected from './Components/secure/Protected.jsx'
import Footer from "./Components/footer/Footer.jsx"
function App() {
  return (
    <>
    <AuthContextProvider>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<SignIn/>}/>
        <Route path='/profile' element={
        <Protected>
            <Profile/>
        </Protected>
          }/>
      </Routes>
      <Footer/>
    </AuthContextProvider>
    </>
  )
}

export default App
