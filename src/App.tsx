import { Route, Routes } from "react-router-dom"
import "./App.css"
import MainPage from "src/components/MainPage"
import SignUp from "src/components/SignUp"
import {AuthContextProvider} from '../src/context/AuthContext'
import SignIn from "src/components/SignIn"
import SearchPage from "src/components/SearchPage"
import ProtectedRoute from "src/components/ProtectedRoute"

const App = () => {
  return (
    <div>
       <AuthContextProvider>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/auth/signup' element={<SignUp/>}/>
          <Route path='/auth/signin' element={<SignIn/>}/>
          <Route path='/search' element={<ProtectedRoute><SearchPage/></ProtectedRoute>}/>
        </Routes>
       </AuthContextProvider>
    </div>
   
  )
}

export default App
