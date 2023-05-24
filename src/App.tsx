import { Route, Routes } from "react-router-dom"
import "./App.css"
import MainPage from "src/components/MainPage"
import SignUp from "src/components/SignUp"
import {AuthContextProvider} from '../src/context/AuthContext'

const App = () => {
  return (
    <div>
       {/* <Fragment>
         <h1>{"Your final task"}</h1>
       </Fragment> */}
       <AuthContextProvider>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/auth/signup' element={<SignUp/>}/>
        </Routes>
       </AuthContextProvider>
    </div>
   
  )
}

export default App
