import React, { useState } from 'react'
import axios from 'axios'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { NavLink } from 'react-router-dom'
export default function Header(props) {

    const [user, setuser] = useState({})

    const responseSuccessGoogle = (response) => {
        let data = { tokenId: response.tokenId }

        axios.post("http://localhost:5000/api/user", data).then((res) => {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            localStorage.setItem('user', JSON.stringify(res.data.user))
            setuser(res.data.user)
            props.login()
        }).catch((err) => {
            console.log(err)
            props.logout()
            localStorage.clear()
        })
    }
    const responseFailGoogle = (response) => {
        setuser({})
        props.logout()
        localStorage.clear()
    }
    const onLogoutSuccess = (response) => {
        setuser({})
        props.logout()
        localStorage.clear()
    }

    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fs-4" to="/">PorDocs</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                            <li className="nav-item" >
                                <NavLink className="nav-link fs-5" to={`/blog/page/${1}`} >Blogs</NavLink>
                            </li>
                            <li className="nav-item" >
                                <NavLink className="nav-link fs-5" to={`/question/page/${1}`} >Questions</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fs-5" to="/addblog">Write a Blog</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fs-5" to="/askquestion">Ask a Question</NavLink>
                            </li>
                            {
                                user && user.isAdmin ?
                                    <li className="nav-item">
                                        <NavLink className="nav-link fs-5" to="/adminpanel">Admin Panel</NavLink>
                                    </li> : null
                            }
                        </ul>
                        {
                            !props.isLogedin ?
                                <GoogleLogin
                                    clientId="1074737771366-mat44f2fndsqpdb8erut14rkmg9e6ui4.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={responseSuccessGoogle}
                                    onFailure={responseFailGoogle}
                                    isSignedIn={true}
                                    cookiePolicy={'single_host_origin'}
                                /> :
                                <GoogleLogout
                                    clientId="1074737771366-mat44f2fndsqpdb8erut14rkmg9e6ui4.apps.googleusercontent.com"
                                    buttonText="LogOut"
                                    onLogoutSuccess={onLogoutSuccess}
                                >
                                </GoogleLogout>
                        }
                    </div>
                </div>
            </nav>

        </div>
    )
}
