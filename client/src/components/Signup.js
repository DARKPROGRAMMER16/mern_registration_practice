import React, { Fragment, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import signup from '../images/signup.svg';

const Signup = () => {

    const history = useHistory();

    const [userData,setUserData] = useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        password:"",
        cpassword:""
    });

    let name,value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUserData({...userData, [name]:value})
    }

    const postData = async(e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = userData;

        const res = await fetch('/register',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        })

        const data = await res.json();

        if(res.status === 422 || !data){
            window.alert("invalid registrations");
            console.log("invalid registrations");
        }
        else{
            window.alert("registration successfull");
            console.log("registration successfull");

            history.push('/login');

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
                                    <div className="signup-leftside col-12 col-lg-6">
                                        <h2 className="form-title text-center">Sign up</h2>
                                        <form method="POST" className="register-form " id="register-form">
                                            <div className="input-field">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="name" 
                                                    id="name" 
                                                    value={userData.name}
                                                    onChange={handleInputs} 
                                                    placeholder="Enter your name"/>
                                            </div>
                                            <div className="input-field">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="email" 
                                                    id="email" 
                                                    value={userData.email}
                                                    onChange={handleInputs} 
                                                    placeholder="Enter your email"/>
                                            </div>
                                            <div className="input-field">
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    name="phone" 
                                                    id="phone" 
                                                    value={userData.phone}
                                                    onChange={handleInputs} 
                                                    placeholder="Enter your phone"/>
                                            </div>
                                            <div className="input-field">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="work" 
                                                    id="work" 
                                                    value={userData.work}
                                                    onChange={handleInputs} 
                                                    placeholder="Enter your work"/>
                                            </div>
                                            <div className="input-field">
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    name="password" 
                                                    id="password" 
                                                    value={userData.password}
                                                    onChange={handleInputs} 
                                                    placeholder="Enter your password"/>
                                            </div>
                                            <div className="input-field">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="cpassword" 
                                                    id="cpassword" 
                                                    value={userData.cpassword}
                                                    onChange={handleInputs} 
                                                    placeholder="Confirm your password"/>
                                            </div>
                                            <input 
                                                type="submit" 
                                                name="signup" 
                                                id="signup" 
                                                value="register"
                                                className="btn btn-style w-100"
                                                onClick={postData}
                                            />
                                        </form>
                                    </div>
                                    <div className="signup-rightside col-12 col-lg-6 text-center">
                                        <figure>
                                            <img src={signup} alt="signupimg" className="img-fluid" />
                                        </figure>
                                        <NavLink to='/login' >I am already registered</NavLink>
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

export default Signup
