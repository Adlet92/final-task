import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {UserAuth} from '../context/AuthContext';
import '../pages/SignIn.css'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn }  = UserAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        if (!email || !password) {
            setError('Login failed! Please, check your email and password and try again.');
            return;
        }
        try{
            await signIn(email, password)
            navigate('/search')
        }catch (e){
            setError('Login failed! Please, check your email and password and try again.');
        }
    }
    
    return (
        <div className="main">
            <div className={`main-container-signin ${error ? 'error-signin' : ''}`}>
                <div className="container-signin">
                    <div className="signin-container">
                        <div className="text-signin">LogIn</div>
                
                        <form onSubmit={handleSubmit}>
                            <div className="data-signin">
                            <label>Email</label>
                            <input 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                placeholder="Enter your email"
                                className={error ? "error-input-signin" : ""}/>
                            </div>
                            <div className="data-signin">
                            <label>Password</label>
                            <input 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                placeholder="Enter your password"
                                className={error ? "error-input-signin" : ""}/>
                            </div>
                            {error && <div className="error-message-signin">{error}</div>}
                            <div className="btn-signin">
                            <button type="submit" disabled={!email || !password}>Login</button>
                            </div>
                
                            <div className="signin-link">
                            Don’t have an account? <Link to='/auth/signup'><label className="slide-signin">Sign up</label></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;