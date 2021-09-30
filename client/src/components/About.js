import React, { Fragment, useEffect,useState } from 'react'
import user from '../images/user.svg';
import {useHistory} from 'react-router-dom';

const About = () => {

    const history = useHistory();
    const [userDataSet, setUserDataSet] = useState({});

    const callAboutPage = async () => {
        try {

            const res = await fetch('/about',{
                method: 'GET',
                headers:{
                    Accept:'application/json',
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });

            const data = await res.json();
            console.log(data);
            setUserDataSet(data);
            console.log(userDataSet);

            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
            
        } catch (error) {
            console.log(error);
            history.push('/login');
        }
    }

    useEffect(() => {
        callAboutPage();
    }, [])

    return (
        <Fragment>
            <section className="about-section">
                <div className="container">
                    <form method="GET">
                        <div className="row">
                            <div className="col-12 col-lg-10 mx-auto">
                                
                                    <div className="row">

                                        <div className="col-md-4">
                                            <figure>
                                                <img src={user} alt="userimg" className="img-fluid" />
                                            </figure>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="profile-head">
                                                <h2 className="main-heading">{userDataSet.name}</h2>
                                                <p className="main-hero-para">{userDataSet.work}</p>
                                            </div>
                                            <div className="profile-details">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <strong>User Id : </strong>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="main-hero-para">{userDataSet._id}</p>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <strong>Name : </strong>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="main-hero-para">{userDataSet.name}</p>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <strong>Email : </strong>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="main-hero-para">{userDataSet.email}</p>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <strong>Phone : </strong>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="main-hero-para">{userDataSet.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <strong>Profession : </strong>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="main-hero-para">{userDataSet.work}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="editbtn">
                                                <input type="submit" name="btnAddMore" className="btn btn-style btn-style-border" value="Edit Profile"/>
                                            </div>
                                        </div>

                                    </div>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Fragment>
    )
}

export default About
