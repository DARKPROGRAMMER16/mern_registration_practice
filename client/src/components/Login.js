import React, { Fragment, useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import login from '../images/login.svg';

import { UserContext } from '../App';

const Login = () => {

    const {state, dispatch} = useContext(UserContext)

    const history = useHistory();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const loginUser = async(e) => {
        e.preventDefault();

        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password})
        });

        const data = await res.json();

        if(res.status === 400 || !data){
            window.alert("invalid credentials");
        }
        else{
            dispatch({type:'USER',payload:true});
            window.alert("login successfull");
            history.push('/');
        }
    }

    return (
        <Fragment>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="row">
                            <div className="col-12 col-lg-10 mx-auto">
                                <div className="row">
                                    <div className="signup-rightside col-12 col-lg-6 text-center">
                                        <figure>
                                            <img src={login} alt="signupimg" className="img-fluid" />
                                        </figure>
                                        <NavLink to='/signup' >Create an Account</NavLink>
                                    </div>
                                    <div className="signup-leftside col-12 col-lg-6">
                                        <div className="login-form">
                                            <h2 className="form-title text-center">Log In</h2>
                                            <form method="POST" className="register-form" id="register-form">
                                                <div className="input-field">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        name="email" 
                                                        id="email"  
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Enter your email"/>
                                                </div>
                                                <div className="input-field">
                                                    <input 
                                                        type="password" 
                                                        className="form-control" 
                                                        name="password" 
                                                        id="password" 
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)} 
                                                        placeholder="Enter your password"/>
                                                </div>
                                                <input 
                                                    type="submit" 
                                                    name="login" 
                                                    id="login" 
                                                    value="log in"
                                                    className="btn btn-style w-100"
                                                    onClick={loginUser}
                                                />
                                            </form>
                                            <div className="row">
                                                <div className="col-6 mx-auto mt-5">
                                                    <div className="row login-icons">
                                                        <div className="col-4 text-center">
                                                            <i className="fab fa-google-plus-square" id="google"></i>
                                                        </div>
                                                        <div className="col-4 text-center">
                                                        <i className="fab fa-facebook-square" id="facebook"></i>
                                                        </div>
                                                        <div className="col-4 text-center">
                                                            <i className="fab fa-apple"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Login
