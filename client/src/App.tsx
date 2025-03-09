import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./components/auth/RegisterPage"
import LoginPage from "./components/auth/LoginPage"
import Main from "./pages/Main/Main"


const App = () => {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<RegisterPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/main" element={<Main />} />
            </Routes>
         </BrowserRouter>
      </>
   )
}

export default App