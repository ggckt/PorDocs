import React, { useState } from 'react'
import axios from 'axios'
function Footer() {
    const [status, setstatus] = useState("")
    const sendMail = (e) => {
        e.preventDefault()
        const mail = {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
        }
        axios.post("https://pordocs.herokuapp.com/contactus/", mail)
            .then((res) => {
                e.target.name.value = ""
                e.target.email.value = ""
                e.target.message.value = ""
                setstatus("Message has been Successfully Sent")
            })
            .catch((err) => console.log(err))
    }


    return (
        <div className="container-fluid">
            <div className="row bg-dark">
                <div className="text-center text-white mt-4">
                    <h4>CONTACT US AT</h4>
                    <h5>HELPDESK@PORDOCS.COM</h5>
                    <h5>+91 7891529592</h5>
                    <p>Copyright © 2021 All Rights Reserved.</p>
                </div>
                <form className="ps-md-5 pe-md-5 mb-3 text-center" onSubmit={sendMail}>
                    {
                        status.length > 0 ?
                            <div className="ms-md-5 me-md-5 alert alert-primary" role="alert">
                                {status}
                            </div> : null
                    }
                    <div className="ms-md-5 me-md-5 form-floating mb-3 border border-2 border-primary">
                        <input required type="text" name="name" className="form-control bg-light" id="floatingInput" placeholder="Enter Your Name"></input>
                        <label>Name</label>
                    </div>
                    <div className="ms-md-5 me-md-5 form-floating mb-3 border border-2 border-primary">
                        <input required type="email" name="email" className="bg-light form-control" id="floatingInput" placeholder="Enter Your Email"></input>
                        <label>Email</label>
                    </div>
                    <div className=" ms-md-5 me-md-5 form-floating border border-2 border-primary">
                        <textarea required className=" bg-light form-control h-25" name="message" rows="5" placeholder="Enter Your message" id="floatingTextarea"></textarea>
                        <label>Message</label>
                    </div>
                    <button type="submit" className="btn btn-outline-primary center mt-3">Sent</button>

                </form >
            </div>
        </div>
    )
}

export default Footer
