import "./App.css"

import { Route, Routes } from "react-router-dom"

import MainPage from "src/components/MainPage/MainPage"
import ProtectedRoute from "src/components/ProtectedRoute"
import SearchPage from "src/components/SearchPage/SearchPage"
import SignIn from "src/components/SignIn/SignIn"
import SignUp from "src/components/SignUp/SignUp"

import { AuthContextProvider } from "../src/context/AuthContext"
import ProteinPage from "src/components/ProteinPage/ProteinPage"
import PageNotFound from "src/components/PageNotFound/PageNotFound"

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/protein/:proteinId/*"
            element={
              <ProtectedRoute>
                <ProteinPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <PageNotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
