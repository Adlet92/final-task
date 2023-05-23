import { Route, Routes } from "react-router-dom"
import "./App.css"

import { Fragment } from "react"
import MainPage from "src/components/MainPage"

const App = () => {
  return (
    <div>
       {/* <Fragment>
         <h1>{"Your final task"}</h1>
       </Fragment> */}
        <Routes>
          <Route path='/' element={<MainPage/>}/>
        </Routes>
    </div>
   
  )
}

export default App
