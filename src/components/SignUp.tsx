import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {UserAuth} from '../context/AuthContext'
import '../pages/SignUp.css'

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState(''); 
    const [error, setError] = useState('');
    const {createUser}  = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

    const emailRegex = /^\S+@\S+\.\S+$/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;

    if (!email || !emailRegex.test(email)) {
        setError('Please enter a valid email');
        return;
    }

    if (!password || password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
    }

    if (!lowercaseRegex.test(password)) {
        setError('Password must contain a lowercase letter');
        return;
    }

    if (!uppercaseRegex.test(password)) {
        setError('Password must contain an uppercase letter');
        return;
    }

    if (!numberRegex.test(password)) {
        setError('Password must contain a number');
        return;
    }

    if (password !== repeatPassword) {
        setError('Passwords do not match');
        return;
    }
        try{
            await createUser(email, password)
            navigate('/search')
        }catch (e: any){
            setError(e.message)
        }
    }
    const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
        setError('');
      };

    return (
        <div className="main">
            <div className={`main-container ${error ? 'error' : ''}`}>
                <div className="container">
                    <div className="signup-container">
                        <div className="text">Sign up</div>
                
                        <form onSubmit={handleSubmit}>
                            <div className="data">
                            <label>Email</label>
                            <input 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                placeholder="Enter your email"
                                className={error ? "error-input" : ""}/>
                            </div>
                            <div className="data">
                            <label>Password</label>
                            <input 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                placeholder="Enter your password"
                                className={error ? "error-input" : ""}/>
                            </div>
                
                            <div className="data">
                            <label>Repeat Password</label>
                            <input 
                                type="password" 
                                placeholder="Enter your password again"
                                value={repeatPassword}
                                onChange={handleRepeatPasswordChange}
                                className={error ? "error-input" : ""} 
                                />
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            <div className="btn-signup">
                            <button type="submit">Create Account</button>
                            </div>
                
                            <div className="signup-link">
                            Already have an account? <Link to='/auth/signin'><label className="slide">Login</label></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;