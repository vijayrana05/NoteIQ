import { Signup } from "./pages/signupPage"
import { Login } from "./pages/loginPage"
import { Home } from "./pages/homePage";
import { LandingPage } from "./pages/landingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
// import NewPost from './components/newpost'
function App(){
  return <>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home/:userId' element = {<Home />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </>
}

export default App
