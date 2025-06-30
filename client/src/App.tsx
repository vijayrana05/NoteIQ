import { Signup } from "./pages/signupPage"
import { Login } from "./pages/loginPage"
import { LandingPage } from "./pages/landingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import EditorPage from "./pages/editorPage";
import { Main } from "./pages/home";
function App(){
  return <>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home/:userId' element = {<Main />} />
          <Route path='/editor' element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </>
}

export default App
