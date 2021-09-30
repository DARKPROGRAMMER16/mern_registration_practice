import React, { Fragment, useEffect,useState} from 'react'
import contactus from '../images/contactus.svg'

const Contact = () => {

    const [userDataSet, setUserDataSet] = useState({name:"",email:"",phone:"",message:""});
    const callContactPage = async () => {
        try {

            const res = await fetch('/getdata',{
                method: 'GET',
                headers:{
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserDataSet({...userDataSet, name:data.name,email:data.email,phone:data.phone });
            console.log(userDataSet);

            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        callContactPage();
    },[]);

    // storing data in state.
    const handleinputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserDataSet({...userDataSet,[name]:value});
    }

    // sending data to the backend
    const contactForm = async (e) => {
        e.preventDefault();

        const { name,email,phone,message } = userDataSet;

        const res = await fetch('/contact', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,phone,message})
        });

        const data = await res.json();

        if(!data){
            console.log("mesage not send");
        }
        else{
            alert("mesage sent successfully");
            setUserDataSet({...userDataSet,message:""});
        }
    }

   
    return (
        <Fragment>
            <section className="contactus-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-10 mx-auto">
                            <div className="row">
                                <div className="contact-leftside col-12 col-lg-5">
                                    <h1 className="main-heading fw-bold">Connect With Our <br/>Team</h1>
                                    <p className="main-hero-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ratione laboriosam a inventore magni est numquam consequuntur expedita at harum!</p>
                                    <figure>
                                        <img src={contactus} alt="contactimg" className="img-fluid" />
                                    </figure>
                                </div>
                                {/* right side portion */}
                                <div className="contact-rightside col-12 col-lg-7">
                                    <form method="POST">
                                        <div className="row">
                                            <div className="col-12 col-lg-12 contact-input-field">
                                                <input 
                                                type="text" 
                                                name="name" 
                                                value={userDataSet.name}
                                                onChange={handleinputs}
                                                id="" 
                                                className="form-control" 
                                                placeholder="Your Name"
                                                />
                                            </div>
                                            
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-lg-6 contact-input-field">
                                                <input 
                                                type="text" 
                                                name="phone" 
                                                value={userDataSet.phone}
                                                onChange={handleinputs}
                                                id="" 
                                                className="form-control" 
                                                placeholder="Phone Number"
                                                />
                                            </div>
                                            <div className="col-12 col-lg-6 contact-input-field">
                                                <input 
                                                type="text" 
                                                name="email" 
                                                value={userDataSet.email}
                                                onChange={handleinputs}
                                                id="" 
                                                className="form-control" 
                                                placeholder="Email Id"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <textarea 
                                                    name="message" 
                                                    value={userDataSet.message}
                                                    onChange={handleinputs} placeholder="message" 
                                                    cols="30" rows="10" className="form-control" ></textarea>
                                            </div>
                                        </div>
                                        <div className="form-check form-checkbox-style">
                                            <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            value="" 
                                            id="flexCheckChecked"/>
                                            <label className="form-check-label" className="main-hero-para">
                                                I agree that Newpay may contact me at the email address or phone no. above.
                                            </label>
                                        </div>
                                        <button type="submit" className="btn btn-style w-100" onClick={contactForm}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Contact
