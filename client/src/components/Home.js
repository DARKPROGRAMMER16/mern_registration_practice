import React, { Fragment, useEffect, useState } from 'react'

const Home = () => {

    const [userName, setUserName]= useState('');
    const [show, setShow] = useState(false);

    const userHomePage = async () => {
        try {

            const res = await fetch('/getdata',{
                method: 'GET',
                headers:{
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        userHomePage();
    },[]);

    return (
        <Fragment>
            <div className="home-page text-center">
                <p className="main-hero-para2">Welcome</p>
                <h1 className="main-heading">{userName}</h1>
                <h1 className="main-heading">{show ? "Happy, to see you back" : "We are the MERN developers"}</h1>
            </div>
        </Fragment>
    )
}

export default Home
