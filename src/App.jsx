
import './App.css'
import { Banner } from './Components/banner/Banner'
import Footer from './Components/footer/Footer'
import { GeneratePassword } from './Components/generatePassword/GeneratePassword'
import { NavBar } from './Components/navbar/NavBar'
import "./index.css"
function App() {
  return (
    <>
      <NavBar/>
      <Banner/>
      <GeneratePassword/>
      <Footer/>
    </>
  )
}

export default App
