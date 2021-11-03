import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"

export default function Profile(props) {
    const [user, setuser] = useState({})
    const [profile, setprofile] = useState({})
    const [blogs, setblogs] = useState([])
    const [pic, setpic] = useState("")
    const [blogLoaded, setblogLoaded] = useState(false)
    useEffect(() => {
        window.scrollTo(0, 0)
        if (props.isLogedin) {
            const user = JSON.parse(localStorage.getItem('user'))
            setuser(user)
        }
        else {
            setuser("")
        }
    }, [props.isLogedin])
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        axios.get(`https://www.pordocs.herokuapp.com/api/user/${props.match.params.id}`, { headers: { "x-access-token": token } })
            .then((res) => {
                if (res.data.pic) {
                    let img = Buffer.from(res.data.pic, 'binary').toString('base64')
                    setpic(img)
                }
                setprofile(res.data)
            })
            .catch((err) => console.log(err))
        axios.get(`https://pordocs.herokuapp.com/api/blog/profile/${props.match.params.id}`)
            .then((res) => {
                setblogs(res.data)
                setblogLoaded(true)
            })
            .catch((err) => console.log(err))
    }, [props.match.params.id])

    return (
        <div className="container-fluid min-vh-100">
            <Helmet>
                <title>{profile.username}</title>
                <meta name="description" content={profile.username} />
            </Helmet>
            {pic !== "dW5kZWZpbmVk" && pic.length > 0 ?
                <img alt={profile.username} src={`data:image/png;base64,${pic}`} className="img-fluid profile-pic mx-auto d-block"></img>
                : null}
            <h3 className="text-center text-primary">{profile.username}</h3>
            {
                (user && user._id === profile._id) || profile.showDetails === true ?
                    <div>
                        <h5 className="text-center">{profile.phoneno}</h5>
                        <h5 className="text-center">{profile.email}</h5>
                        <div className="icons text-center pt-2">
                            <Link to={{ pathname: profile.linkedin || "#" }} target="_blank" className="ps-2 pe-2" ><i className="fa fa-linkedin fa-2x" ></i></Link>
                            <Link to={{ pathname: profile.facebook || "#" }} target="_blank" className="ps-2 pe-2"><i className="fa fa-facebook fa-2x"></i></Link>
                            <Link to={{ pathname: profile.instagram || "#" }} target="_blank" className="ps-2 pe-2"><i className="fa fa-instagram fa-2x"></i></Link>
                            <Link to={{ pathname: profile.twitter || "#" }} target="_blank" className="ps-2 pe-2"><i className="fa fa-twitter fa-2x"></i></Link>
                            <Link to={{ pathname: profile.youtube || "#" }} target="_blank" className="ps-2 pe-2"><i className="fa fa-youtube-play fa-2x"></i></Link>
                            <Link to={{ pathname: profile.other || "#" }} target="_blank" className="ps-2 pe-2"><i className="fa fa-external-link fa-2x"></i></Link>
                        </div>
                    </div> : null
            }


            <div className="ms-md-5 me-md-5">
                {user && user._id === profile._id ?
                    <Link to={`/profile/edit/${profile._id}`}>Edit Profile</Link>
                    : null}
                {
                    !blogLoaded ? <div className="d-flex justify-content-center mt-5">
                        <div className="spinner-grow text-primary" role="status"></div>
                        <div className="spinner-grow text-warning" role="status"></div>
                        <div className="spinner-grow text-info" role="status"></div>
                    </div>
                        : null
                }
                <br></br>
                <h4 className="mt-3">Blogs</h4>
                {
                    blogs.map((blog) => {
                        return (
                            <div key={blog._id} >
                                <div className="list-group-item list-group-item-action shadow-lg mb-3 bg-white rounded">
                                    <Link to={`/blog/${blog._id}`} className="flex-column align-items-start" style={{ textDecoration: "none" }}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h4 className="mb-1 text-dark pt-3">{blog.title}</h4>
                                        </div>
                                        <p className="mb-1 text-dark trunc mt-2">{blog.content}</p>
                                    </Link>
                                    <Link to={`/profile/${blog.userid}`} style={{ textDecoration: "none" }}>
                                        <small className="text-muted">By {blog.username}</small>
                                    </Link>
                                    <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
                                        <p className="text-center text-info">Read More</p>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>


        </div >
    )
}
