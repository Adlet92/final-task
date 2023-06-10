import "./SignUp.css"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Loading from "src/components/Loading/Loading"
import { routes } from "src/utils/routes"
import { validateForm } from "src/utils/validation"
import { UserAuth } from "../../context/AuthContext"

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false);
  const auth = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const errors = validateForm(email, password, repeatPassword);

    if (errors.length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    try {
      if (auth && auth.createUser) {
      await auth.createUser(email, password);
      navigate(routes.search);
      }
    } catch (error_: unknown) {
      if (typeof error_ === "object" && error_ !== null) {
        const error = error_ as { code?: string; message?: string };
        if (error.code === "auth/email-already-in-use") {
          setErrors(["User already exists. Please sign in instead."]);
        } else {
          setErrors([error.message || "An error occurred"]);
        }
      } else {
        setErrors(["An error occurred"]);
      }
    }

    setLoading(false);
  }



  const handleEmailBlur = () => {
    const errors = validateForm(email, password, repeatPassword);
    setErrors(errors);
  };


  const handlePasswordBlur = () => {
    const errors = validateForm(email, password, repeatPassword);
    setErrors(errors);
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
    const errors = validateForm(email, password, e.target.value);
    setErrors(errors);
  };

  return (
    <div className="main">
      <div className={`main-container ${errors.length ? "error" : ""}`}>
        <div className="container">
          <div className="signup-container">
            <div className="text">Sign up</div>

            <form onSubmit={handleSubmit}>
              <div className="data">
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  value={email}
                  placeholder="Enter your email"
                  className={
                    errors.includes("Email is required") || errors.includes("User already exists. Please sign in instead.") || errors.includes("Invalid email format")
                      ? "error-input"
                      : ""
                  }
                />
              </div>
              <div className="data">
                <label>Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                  type="password"
                  placeholder="Enter your password"
                  className={errors.some(
                    (error) =>
                      error !== "Email is required" &&
                      error !== "Passwords do not match" &&
                      error !== "Invalid email format" &&
                      error !== "User already exists. Please sign in instead."
                  )
                    ? "error-input"
                    : ""}
                />
              </div>

              <div className="data">
                <label>Repeat Password</label>
                <input
                  type="password"
                  placeholder="Enter your password again"
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  className={errors.includes("Passwords do not match") ? "error-input" : ""}
                />
              </div>
              {errors.length > 0 && (
                <div className="error-message">
                  {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
              <div className="btn-signup">
                <button type="submit" disabled={loading}>{loading ? <Loading/> : "Create Account"}</button>
              </div>
              <div className="signup-link">
                Already have an account?{" "}
                <Link to={routes.signin}>
                  <label className="slide">Login</label>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
