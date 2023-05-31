import "./SignUp.css"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { UserAuth } from "../../context/AuthContext"
import Loading from "src/components/Loading/Loading"
import { routes } from "src/utils/routes"

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false);
  const { createUser } = UserAuth()
  const navigate = useNavigate()


  const validatePassword = (value: string) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;

    const newErrors: string[] = [];

    if (!value || value.length < 6) {
      newErrors.push("Password must be at least 6 characters long");
    } 
    if (!lowercaseRegex.test(value)) {
        newErrors.push("Password must contain a lowercase letter");
    }
    if (!uppercaseRegex.test(value)) {
        newErrors.push("Password must contain an uppercase letter");
    }

    if (!numberRegex.test(value)) {
        newErrors.push("Password must contain a number");
    }

    if (value !== repeatPassword) {
      newErrors.push("Passwords do not match");
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    if (!email) {
      setErrors(["Email is required"]);
      setLoading(false);
      return;
    }

    const passwordErrors = validatePassword(password);

    if (passwordErrors.length > 0) {
      setErrors(passwordErrors);
      setLoading(false);
      return;
    }

    try {
      await createUser(email, password)
      navigate(routes.search);
    } catch (error_: any) {
      if (error_.code === "auth/email-already-in-use") {
        setErrors(["User already exists. Please sign in instead."])
      } else {
        setErrors([error_.message])
      }
    }
    setLoading(false);
  }

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRepeatPassword(e.target.value)
    setErrors([])
  }

  const handleEmailBlur = () => {
    if (!email) {
      setErrors(["Email is required"]);
    }
  };

  const handlePasswordBlur = () => {
    const passwordErrors = validatePassword(password);
    setErrors(passwordErrors);
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
                  type="email"
                  placeholder="Enter your email"
                  className={
                    errors.includes("Email is required") || errors.includes("User already exists. Please sign in instead.")
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
